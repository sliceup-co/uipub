/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/TemplateButtons/TemplateButtons.tsx

Created with;
$ npx generate-react-cli component TemplateButtons --type=materialui

*/

import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function TemplateButtons(props: ITemplateButtonsProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        props.selectedTemplateItems[0] !== ''
          ?
            <>
              <Button variant="contained" color="secondary" onClick={() => props.filterTemplatesHandler('similar')}>
                Show Similar Templates
              </Button>
              <Button variant="contained" onClick={() => props.filterTemplatesHandler('filter')}>
                Filter at Source
              </Button>
            </>
          :
            <>
              <Button variant="contained" disabled color="secondary">
                Show Similar Templates
              </Button>
              <Button variant="contained" disabled>
                Filter at Source
              </Button>
            </>
      }
      {props.selectedTemplateItems.length > 1
        ?
          <>
            <Button variant="contained" color="primary" onClick={() => props.filterTemplatesHandler('combine')}>Combine
              Templates
            </Button>
          </>
        :
          <>
            <Button variant="contained" color="primary" disabled>Combine
              Templates
            </Button>
          </>}
    </div>
  );
}

interface ITemplateButtonsProps {
  filterTemplatesHandler: (type: string) => void
  selectedTemplateItems: string[]
}