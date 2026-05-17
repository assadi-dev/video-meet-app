import { useEnumerateDevices } from "@/waiting-room/_hooks/useEnumerateDevices";
import { ConfigurationFormType } from "@/waiting-room/schema";
import { DEVICE_STATE_EVENT } from "@/waiting-room/type";
import FormFieldComboBox from "@components/forms/FormFieldComboBox";
import React from "react";
import { useFormContext } from "react-hook-form";


const SelectedAudioSource = () => {

  const form = useFormContext<ConfigurationFormType>()
  const { devices, emit } = useEnumerateDevices()

  const options = devices.filter((device) => device.kind === "audioinput").map((device) => ({
    label: device.label,
    value: device.deviceId,
  }));

  const onSelected = (value: Record<string, any>) => {
    emit(DEVICE_STATE_EVENT.select, value.value, "audioinput");
  }

  return (
    <FormFieldComboBox
      label="Source audio"
      form={form}
      control={form.control}
      name="audioSource"
      options={options}
      classNameButton="w-full"
      classNameListOptions="w-full"
      callback={onSelected}
    />
  );
};

export default SelectedAudioSource;
