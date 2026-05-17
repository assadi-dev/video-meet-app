
import React from "react";

export type MediaDevice = {
  id: string;
  label: string;
  kind: string;
  mediaStreamTrack?: MediaStreamTrack | null;
};
export type MediaDeviceState = {
  videoDevices: MediaDevice[];
  audioDevices: MediaDevice[];
  selectedVideoDevice: MediaDevice | null;
  selectedAudioDevice: MediaDevice | null;
  mediaStream?: MediaStream | null;
  browserSupported: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
};

export const DISPATCH_ACTION = {
  SET_SELECTED_VIDEO_DEVICE: "SET_SELECTED_VIDEO_DEVICE",
  SET_SELECTED_AUDIO_DEVICE: "SET_SELECTED_AUDIO_DEVICE",
  SET_VIDEO_DEVICES: "SET_VIDEO_DEVICES",
  SET_AUDIO_DEVICES: "SET_AUDIO_DEVICES",
  SET_STREAM: "SET_STREAM",
  ENABLE_AUDIO_STREAM: "ENABLE_AUDIO_STREAM",
  ENABLE_VIDEO_STREAM: "ENABLE_VIDEO_STREAM",
  SET_DATA: "SET_DATA",
} as const;

type MediaDeviceAction = {
  action: keyof typeof DISPATCH_ACTION;
  data: any;
};

const mediaDeviceReducer = (
  state: MediaDeviceState,
  payload: MediaDeviceAction
) => {
  const { action, data } = payload;
  switch (action) {
    case "SET_VIDEO_DEVICES":
      return { ...state, videoDevices: data };
    case "SET_SELECTED_VIDEO_DEVICE":
      return { ...state, selectedVideoDevice: data };
    case "SET_SELECTED_AUDIO_DEVICE":
      return { ...state, selectedAudioDevice: data };
    case "SET_AUDIO_DEVICES":
      return { ...state, audioDevices: data };
    case "SET_STREAM":
      return { ...state, mediaStream: data };
    case "ENABLE_AUDIO_STREAM":
      return {
        ...state,
        mediaStream: data.stream,
        isAudioEnabled: data.enabled,
      };
    case "ENABLE_VIDEO_STREAM":
      return {
        ...state,
        mediaStream: data.stream,
        isVideoEnabled: data.enabled,
      };
    case "SET_DATA":
      return { ...state, ...data };
    default:
      return state;
  }
};

const useMediaDevices = () => {
  const [state, dispatch] = React.useReducer(mediaDeviceReducer, {
    videoDevices: [],
    audioDevices: [],
    selectedVideoDevice: null,
    selectedAudioDevice: null,
    browserSupported: false,
    mediaStream: null,
    isAudioEnabled: true,
    isVideoEnabled: true,
  });
  let selectedVideoDevice: MediaDevice | null = null;
  let selectedAudioDevice: MediaDevice | null = null;


  const enableMediaStream = (kind: "audio" | "video", enabled: boolean) => {
    const stream = state.mediaStream as MediaStream;
    if (!stream) return;
    switch (kind) {
      case "video":
        stream.getVideoTracks().forEach((track) => {
          track.enabled = enabled;
        });
        dispatch({
          action: DISPATCH_ACTION.ENABLE_VIDEO_STREAM,
          data: { stream, enabled },
        });
        break;
      case "audio":
        stream.getAudioTracks().forEach((track) => {
          track.enabled = enabled;
        });
        dispatch({
          action: DISPATCH_ACTION.ENABLE_AUDIO_STREAM,
          data: { stream, enabled },
        });
        break;
    }
  };

  const saveMediaDevices = async () => {
    const userMedias = await navigator.mediaDevices.enumerateDevices();
    const videoDevices: MediaDevice[] = [];
    const audioDevices: MediaDevice[] = [];
    // Save videos  devices
    for (const device of userMedias.filter((u) => u.kind === "videoinput")) {
      const data = {
        id: device.deviceId,
        label: device.label,
        kind: device.kind,
      } satisfies MediaDevice;
      videoDevices.push(data);
    }

    // Save audios devices
    for (const device of userMedias.filter((u) => u.kind === "audioinput")) {
      const data = {
        id: device.deviceId,
        label: device.label,
        kind: device.kind,
      } satisfies MediaDevice;
      audioDevices.push(data);
    }
    const data = {
      videoDevices,
      audioDevices,
    };

    dispatch({ action: DISPATCH_ACTION.SET_DATA, data });
  };

  React.useEffect(() => {
    let browserSupported: boolean = false;
    const checkUserMediaSupport = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw Error("Navigateur pris en charge.");
        }
        console.log("✅ Navigateur pris en charge!");
        browserSupported = true;
      } catch (error) {
        if (error instanceof Error) {
          console.warn(error.message);
        }
      }
    };
    const initUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        const tracks = stream.getTracks();
        const devices = await navigator.mediaDevices.enumerateDevices();

        devices.forEach((device) => {
          if (tracks.some((t) => t.label === device.label)) {
            const mediaTrack = stream
              .getTracks()
              .find((t) => t.label === device.label);

            if (mediaTrack) {
              const mediaDevice: MediaDevice = {
                id: device.deviceId,
                label: device.label,
                kind: mediaTrack.kind,
                mediaStreamTrack: mediaTrack,
              };

              if (mediaDevice.kind === "video")
                selectedVideoDevice = mediaDevice;
              if (mediaDevice.kind === "audio")
                selectedAudioDevice = mediaDevice;
            }
          }
        });

        dispatch({
          action: DISPATCH_ACTION.SET_DATA,
          data: {
            mediaStream: stream,
            selectedVideoDevice,
            selectedAudioDevice,
            browserSupported,
            isAudioEnabled: state.isAudioEnabled,
            isVideoEnabled: state.isVideoEnabled,
          },
        });
        await loadUserDevicePref(selectedVideoDevice, selectedAudioDevice);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Erreur accès device: ", error.message);
        }
      }
    };

    const loadUserDevicePref = async (
      selectedVideoDevice: MediaDevice | null,
      selectedAudioDevice: MediaDevice | null
    ) => {
      if (!selectedVideoDevice || !selectedAudioDevice) return;
      const devices = await navigator.mediaDevices.enumerateDevices();
      let deviceIdAudio: string = selectedAudioDevice.id;
      let deviceIdVideo: string = selectedVideoDevice.id;

      if (devices) {
        if (deviceIdVideo) {
          const findDeviceVideo = devices
            .filter((d) => d.kind === "videoinput")
            .find((d) => d.deviceId === deviceIdVideo);
          if (findDeviceVideo) deviceIdVideo = findDeviceVideo.deviceId;
        }

        if (deviceIdAudio) {
          const findDeviceAudio = devices
            .filter((d) => d.kind === "audioinput")
            .find((d) => d.deviceId === deviceIdAudio);
          if (findDeviceAudio) deviceIdAudio = findDeviceAudio.deviceId;
        }
        changeUserDevice({ deviceIdVideo, deviceIdAudio });
      }
    };
    checkUserMediaSupport();

    if (browserSupported) {
      initUserMedia();
      saveMediaDevices();
    }
  }, [state.browserSupported]);

  const changeUserDevice = async ({
    deviceIdAudio,
    deviceIdVideo,
  }: {
    deviceIdVideo?: string;
    deviceIdAudio?: string;
  }) => {
    if (!state.mediaStream) return;

    // Stop the older stream!
    state.mediaStream.getTracks().forEach((track) => track.stop());
    const stream = await navigator.mediaDevices.getUserMedia({
      video: deviceIdVideo
        ? { deviceId: { exact: deviceIdVideo } }
        : { deviceId: { exact: state.selectedVideoDevice?.id } },
      audio: deviceIdAudio
        ? { deviceId: { exact: deviceIdAudio } }
        : { deviceId: { exact: state.selectedAudioDevice?.id } },
    });
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = state.isVideoEnabled));
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = state.isAudioEnabled));

    const devices = await navigator.mediaDevices.enumerateDevices();
    if (!state.selectedAudioDevice || !state.selectedVideoDevice) return;
    let mediaVideoDevice: MediaDevice = state.selectedVideoDevice;
    let mediaAudioDevice: MediaDevice = state.selectedAudioDevice;

    for (const device of devices) {
      if (device.deviceId === deviceIdVideo) {
        const mediaVideoTrack = stream
          .getTracks()
          .find((t) => t.label === device.label);
        if (mediaVideoTrack) {
          mediaVideoDevice = {
            ...state.selectedVideoDevice,
            id: device.deviceId,
            label: device.label,
            mediaStreamTrack: mediaVideoTrack,
            kind: mediaVideoTrack.kind,
          };

          if (mediaVideoTrack.kind === "video") {
            selectedVideoDevice = mediaVideoDevice;
          }
        }
      }

      if (device.deviceId === deviceIdAudio) {
        const mediaAudioTrack = stream
          .getTracks()
          .find((t) => t.label === device.label);
        if (mediaAudioTrack) {
          mediaAudioDevice = {
            ...state.selectedVideoDevice,
            id: device.deviceId,
            label: device.label,
            mediaStreamTrack: mediaAudioTrack,
            kind: mediaAudioTrack.kind,
          };
          selectedAudioDevice = mediaAudioDevice;
        }
      }
    }

    const data = {
      mediaStream: stream,
      selectedVideoDevice,
      selectedAudioDevice,
    };

    dispatch({ action: DISPATCH_ACTION.SET_DATA, data });
  };

  return {
    browserSupported: state.browserSupported,
    videoDevices: state.videoDevices,
    audioDevices: state.audioDevices,
    selectedVideoDevice: state.selectedVideoDevice,
    selectedAudioDevice: state.selectedAudioDevice,
    mediaStream: state.mediaStream,
    isAudioEnabled: state.isAudioEnabled,
    isVideoEnabled: state.isVideoEnabled,
    enableMediaStream,
    changeUserDevice,
  };
};

export default useMediaDevices;
