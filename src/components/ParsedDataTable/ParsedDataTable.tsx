/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/TemplateListTable/TemplateListTable.tsx

Created with;
$ npx generate-react-cli component ParsedDataTable --type=materialui

https://material-ui.com/components/tables/

*/

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import './ParsedDataTable.scss'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import { Types } from '../../types'
import { initVariablesFilterObject, variablesFilterObject } from '../../model'
import ParsedAppNameDataModal from '../ParsedAppNameDataModal/ParsedAppNameDataModal'
import ParsedFieldDataModal from '../ParsedFieldDataModal/ParsedFieldDataModal'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Types.VariablesData
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  { id: 'record_id', numeric: false, disablePadding: true, label: 'record_id' },
  { id: 'template_id', numeric: false, disablePadding: false, label: 'template_id' },
  { id: 'appname', numeric: false, disablePadding: false, label: 'appname' },
  { id: 'template_version', numeric: false, disablePadding: false, label: 'template_version' },
  { id: 'time_window_id', numeric: false, disablePadding: false, label: 'time_window_id' },
  { id: 'num_1', numeric: false, disablePadding: false, label: 'num_1' },
  { id: 'timestamp', numeric: false, disablePadding: true, label: 'timestamp' },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Types.VariablesData) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  fieldsNameData: Types.FieldsData[]
  onUpdateFieldName: (oldName: string, newName: string) => void
}

function EnhancedTableHead(props: EnhancedTableProps) {

  const [openFieldModal, setOpenFieldModal] = React.useState(false)
  const [selectedFieldName, setSelectedFieldName] = React.useState('')

  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Types.VariablesData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const onHeaderClickHandler = (fieldName: string) => {
    setSelectedFieldName(fieldName)
    setOpenFieldModal(true)
  }

  const onSubmitFieldModalHandler = (oldName: string, newName: string) => {
    setOpenFieldModal(false)
    props.onUpdateFieldName(oldName, newName)
  }

  return (
    <TableHead>
      <ParsedFieldDataModal
        openModal={openFieldModal}
        setOpenFieldModal={setOpenFieldModal}
        selectedFieldName={selectedFieldName}
        onSubmitHandler={onSubmitFieldModalHandler}
        fieldsNameData={props.fieldsNameData}
      />
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'default'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div
                role="button"
                tabIndex={0}
                className="template-modal-link"
                onClick={() => {onHeaderClickHandler(headCell.id as string)}}
              >
                {headCell.label}
              </div>
              {orderBy === headCell.id ? <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  })
)

interface EnhancedTableToolbarProps {
  numSelected: number
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Parsed Data Table
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)

export default function ParsedDataTable(props: IParsedDataTableProps) {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Types.VariablesData>('record_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [openAppNameModal, setOpenAppNameModal] = React.useState(false)
  const [selectedRecordId, setSelectedRecordId] = React.useState('')
  const [selectedName, setSelectedName] = React.useState('')

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) {
      props.onVariablePageUpdate(initVariablesFilterObject())
      setLoaded(true)
    }
  }, [loaded, props, props.onVariablePageUpdate])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Types.VariablesData) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.variableData.map((n) => n.record_id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    props.onVariablePageUpdate({
      pageNumber: newPage + 1,
      resultsPerPage: 5,
      startDate: '',
      endDate: '',
      totalResults: 0,
      templateName: '',
      category: ''
    })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resultsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(resultsPerPage)
    setPage(0)
    props.onVariablePageUpdate({
      pageNumber: 1,
      resultsPerPage,
      startDate: '',
      endDate: '',
      category: '',
      templateName: '',
      totalResults: 0
    })
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.variableData.length - page * rowsPerPage)

  const onFieldClickHandler = (recordId: string, oldName: string) => {
    setSelectedRecordId(recordId)
    setSelectedName(oldName)
    setOpenAppNameModal(true)
  }

  const onSubmitAppNameChangeHandler = (oldName: string, newName: string) => {
    setOpenAppNameModal(false)
    props.onUpdateName(oldName, newName)
  }

  return (
    <div className={classes.root}>
      <ParsedAppNameDataModal
        oldName={selectedName}
        openModal={openAppNameModal}
        setOpenModal={setOpenAppNameModal}
        recordId={selectedRecordId}
        onSubmitAppNameChangeHandler={onSubmitAppNameChangeHandler}
      />
      <Paper className={classes.paper}>
        {props.variablesFilter.totalResults === 1 ? (
          <span>No Parsed Data Results Found</span>
        ) : (
          <>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table">
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={props.variableData.length}
                  fieldsNameData={props.fieldsNameData}
                  onUpdateFieldName={props.onUpdateFieldName}
                />
                <TableBody>
                  {stableSort(props.variableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.record_id)
                      const labelId = `enhanced-table-checkbox-${index}`

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.record_id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.record_id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                          </TableCell>
                          <TableCell align="right">{row.record_id}</TableCell>
                          <TableCell align="right">{row.template_id}</TableCell>
                          <TableCell align="right">
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                            <div
                              role="button"
                              tabIndex={0}
                              className="template-modal-link"
                              onClick={() => {onFieldClickHandler(row.record_id as string, row.appname as string)}}
                            >
                              {row.appname === '' ? 'Add a name' : row.appname}
                            </div>
                          </TableCell>
                          <TableCell align="right">{row.template_version}</TableCell>
                          <TableCell align="right">{row.time_window_id}</TableCell>
                          <TableCell align="right">{row.num_1}</TableCell>
                          <TableCell align="right">{row.timestamp}</TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={props.variablesFilter.totalResults}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      {props.variablesFilter.totalResults === 1 ? (
        <div style={{ height: '50' }} />
      ) : (
        <>
          <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
          <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel value="top" control={<Radio color="primary" />} label="Show All Values" labelPlacement="start" />
              <FormControlLabel value="start" control={<Radio color="primary" />} label="Show Unique Values" labelPlacement="start" />
            </RadioGroup>
          </FormControl>
        </>
      )}
    </div>
  )
}

interface IParsedDataTableProps {
  onVariablePageUpdate: (object: variablesFilterObject) => void
  variableData: Types.VariablesData[]
  variablesFilter: variablesFilterObject
  fieldsNameData: Types.FieldsData[]
  onUpdateName: (oldName: string, newName: string) => void
  onUpdateFieldName: (oldName: string, newName: string) => void
}
