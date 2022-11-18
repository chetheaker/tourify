import './StopInput.css';
import { Autocomplete } from '@react-google-maps/api';
import { useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { GrLocation } from 'react-icons/gr';
import { StopInputProps } from '../../../types/props';
import { Stop } from '../../../types/models';
import React, { FormEvent } from 'react';

function StopInput({ isEdit, setStops }: StopInputProps) {
  const toast = useToast();
  const addStop = (e: FormEvent) => {
    type TargetType = EventTarget & {
      stop: {
        value: string
      },
    };

    const target = e.target as TargetType;
    e.preventDefault();
    if (target.stop.value === '') {
      toast({
        position: 'bottom-left',
        title: 'Error',
        description: 'Stop cannot be blank',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const newStop: Stop = {
      stop: target.stop.value,
      id: uuidv4(),
      arrival: false,
      departure: false
    };
    setStops((prev) => [...prev, newStop]);
    target.stop.value = '';
  };

  return (
    <form
      onSubmit={addStop}
      className={`stop-input-container ${isEdit ? 'show' : 'hide'}`}
    >
      <GrLocation className="location-icon" size="1.1em" />
      <Autocomplete className="autocomplete">
        <input
          type="text"
          placeholder="Add a stop..."
          name="stop"
          className="stop-input"
        />
      </Autocomplete>
      <button type="submit" className="stop-input-button">
        Add Stop
      </button>
    </form>
  );
}

export default StopInput;
