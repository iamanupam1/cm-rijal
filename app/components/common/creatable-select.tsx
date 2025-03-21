"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import slugify from "slugify";

const CreatableSelectComponent = ({
  defaultOptions = [],
  isMultiple = false,
  setSelectValue,
  defaultValue = [],
  createFunction,
  closeMenuOnSelect = false,
}: {
  defaultOptions: any[];
  isMultiple: boolean;
  setSelectValue: Dispatch<SetStateAction<any>>; 
  defaultValue: any;
  createFunction: (inputValue: string) => void;
  closeMenuOnSelect: boolean;
}) => {
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleCreate = async (inputValue: string) => {
    if (!inputValue) return;
    const optionList = {
      label: inputValue,
      value: slugify(inputValue, { lower: true }),
    };
    setIsLoading(true);
    const newOption = await createFunction(optionList);
    setSelectValue((prev) => {
      const newValues = prev ? [...prev, newOption] : [newOption];
      return newValues;
    });
    setValue((prev) => {
      const newValues = prev ? [...prev, newOption] : [newOption];
      return newValues;
    });
    setOptions((prev) => [...prev, newOption]);
    setIsLoading(false);
  };

  return (
    <CreatableSelect
      id="long-value-select"
      instanceId="long-value-select"
      isMulti={isMultiple}
      isClearable
      closeMenuOnSelect={closeMenuOnSelect}
      isLoading={isLoading}
      isDisabled={isLoading}
      onChange={(newValue) => {
        setSelectValue(newValue);
        setValue(newValue);
      }}
      onCreateOption={(inputValue) => handleCreate(inputValue)}
      options={options}
      value={value}
    />
  );
};

export default CreatableSelectComponent;
