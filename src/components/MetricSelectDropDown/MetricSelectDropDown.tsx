/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/MetricSelectDropDown/MetricSelectDropDown.tsx

Created with;
$ npx generate-react-cli component MetricSelectDropDown --type=materialui

https://material-ui.com/components/selects/

*/

import React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function MetricSelectDropDown(props: IMetricSelectDropDownProps) {

  const classes = useStyles();
  const [metric, setMetric] = React.useState(props.metricSelected) // 'template_version'

  const metricsValues: { value: string }[] = [
    { value: 'template_version' },
    { value: 'num_1' },
    { value: 'num_2' },
    { value: 'num_3' },
    { value: 'pack_auto_log_1' },
    { value: 'wpa_supplicant_1' },
    { value: 'len_1' },
    { value: 'alphanumerical_1' },
    { value: 'alphanumerical_2' },
  ]

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMetric = event.target.value as string
    setMetric(newMetric);
    props.onPieMetricChangeHandler(newMetric)
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <NativeSelect
          id="demo-customized-select-native"
          value={metric}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option key={metric} value={metric}>{metric}</option>
          {metricsValues.map(item => {
            if (item.value !== metric)
              return <option key={item.value} value={item.value}>{item.value}</option>
            return <></>
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

interface IMetricSelectDropDownProps {
  onPieMetricChangeHandler: (metric: string) => void
  metricSelected: string
}
