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
import './CategoriesDrowDown.scss'
import { Types } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  }),
);

export default function CategoriesDropDown(props: IMetricSelectDropDownProps) {

  const classes = useStyles();
  const [category, setCategory] = React.useState('Security')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCategory = event.target.value as string
    setCategory(newCategory);
    props.onCategoryChangeHandler(newCategory)
  };
  return (
    <div>

      <FormControl style={{ minWidth: 200 }} variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Category</InputLabel>
        <Select
          native
          value={category}
          onChange={handleChange}
        >
          <option key={category} value={category}>{category}</option>
          {props.categoriesData.map(item => {
            if (item.value !== category)
              return <option key={item.value} value={item.value}>{item.value}</option>
            return <></>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

interface IMetricSelectDropDownProps {
  onCategoryChangeHandler: (selectedCategory: string) => void
  categoriesData: Types.CategoriesData[]
}
