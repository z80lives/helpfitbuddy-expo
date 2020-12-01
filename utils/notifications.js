import React from 'react';
import {Toast} from "native-base";

export const makeToast = (msg) => {
    Toast.show({
	text: msg,
	position: "bottom",
	    duration: 3000,
    });
}

