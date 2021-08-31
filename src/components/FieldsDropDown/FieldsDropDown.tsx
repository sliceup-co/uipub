/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/MetricSelectDropDown/CategoriesDropDown.tsx

https://material-ui.com/components/selects/

*/

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import './FieldsDrowDown.scss'
import { Types } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  }),
);

export default function FieldsDropDown(props: IMetricSelectDropDownProps) {

  const classes = useStyles();
  const [field, setField] = React.useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newVal = event.target.value as string
    setField(newVal);
    props.onFieldChangeHandler(newVal)
  };
  return (
    <div>

      <FormControl style={{ minWidth: 200 }} variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Select Existing Field</InputLabel>
        <Select
          native
          value={field}
          onChange={handleChange}
        >
          <option key={field} value={field}>{field}</option>
          {props.fieldsData.map(item => {
            if (item.value !== field)
              return <option key={item.value} value={item.value}>{item.value}</option>
            return <></>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

interface IMetricSelectDropDownProps {
  onFieldChangeHandler: (selectedCategory: string) => void
  fieldsData: Types.FieldsData[]
}
