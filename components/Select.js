import { react } from 'react';
import RNPickerSelect from "react-native-picker-select";

function Select(props) {

    return         <RNPickerSelect
    onValueChange={(value) => console.log(value)}
    items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
    ]}
/>
}

export default Select