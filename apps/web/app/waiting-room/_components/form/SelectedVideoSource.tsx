import { useEnumerateDevices } from "@/waiting-room/_hooks/useEnumerateDevices";
import { ConfigurationFormType } from "@/waiting-room/schema";
import FormFieldComboBox from "@components/forms/FormFieldComboBox";
import React from "react";
import { useFormContext } from "react-hook-form";


const SelectedVideoSource = () => {

  const form = useFormContext<ConfigurationFormType>()
  const { devices } = useEnumerateDevices()

  const options = devices.filter((device) => device.kind === "videoinput").map((device) => ({
    label: device.label,
    value: device.deviceId,
  }));

  const onSelected = (value: Record<string, any>) => {
    console.log(value);
    form.setValue("videoSource", value.value);
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
