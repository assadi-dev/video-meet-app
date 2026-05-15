import { useEnumerateDevices } from "@/waiting-room/_hooks/useEnumerateDevices";
import { useResetDevices } from "@/waiting-room/_hooks/useResetDevices";
import { ConfigurationFormType } from "@/waiting-room/schema";
import { DEVICE_STATE_EVENT } from "@/waiting-room/type";
import FormFieldComboBox from "@components/forms/FormFieldComboBox";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";


const SelectedVideoSource = () => {

  const form = useFormContext<ConfigurationFormType>()
  const { devices, emit } = useEnumerateDevices()
  useResetDevices(form)

  const options = devices.filter((device) => device.kind === "videoinput").map((device) => ({
    label: device.label,
    value: device.deviceId,
  }));

  const onSelected = (value: Record<string, any>) => {
    form.setValue("videoSource", value.value);
    emit(DEVICE_STATE_EVENT.select, value.value, "videoinput");
  }




  return (
    <FormFieldComboBox
      label="Source vidéo"
      form={form}
      control={form.control}
      name="videoSource"
      options={options}
      classNameButton="w-full"
      classNameListOptions="w-full"
      callback={onSelected}
    />
  );
};

export default SelectedVideoSource;
