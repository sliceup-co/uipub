/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/pages/TemplateListTable/TemplateListTable.tsx

Created with;
$ npx generate-react-cli component TemplateListTable --type=materialui

https://material-ui.com/components/tables/

*/

import React, { Dispatch, SetStateAction, useEffect } from 'react'
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
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import './TemplateListTable.scss'
import { templateFilterObject } from '../../model'
import { Types } from '../../types'
import TemplateListModal from '../TemplateListModal/TemplateListModal'

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
  id: keyof Types.TemplateData
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  { id: 'Template', numeric: false, disablePadding: true, label: 'Template' },
  { id: 'Template_id', numeric: true, disablePadding: false, label: 'Template Id' },
  { id: 'Version', numeric: true, disablePadding: false, label: 'Version' },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Types.TemplateData) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Types.TemplateData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        <TableCell align="left" padding="default">
          <TableSortLabel />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'default'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
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
          Template List
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

export default function  TemplateListTable(props: ITemplateListTableProps) {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Types.TemplateData>('Template_id')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)

  const [openModal, setOpenModal] = React.useState(false)

  const [selectedTemplateId, setSelectedTemplateId] = React.useState('')

  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const onSubmitHandler = (name: string, fields: string, categories: string) => {
    // alert(`name: ${name  }, fields: ${  fields  }, categories: ${  categories}`)
    setOpenModal(false)
    props.onSubmitUpdateTemplateInformationHandler({
      name,
      fields,
      category: categories
    })
  }

  useEffect(() => {
    if (props.templateData.length < 1) {
      props.onTemplatePageUpdate({
        pageNumber: 1,
        resultsPerPage: 5,
      })
    }
  }, [props])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Types.TemplateData) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.templateData.map((n) => n.Template)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, Template: string) => {
    const selectedIndex = selected.indexOf(Template)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Template)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
    props.onTemplateItemsSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    props.setLoadingTemplate(false)
    props.onTemplatePageUpdate({
      pageNumber: newPage + 1,
      resultsPerPage: 5,
    })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resultsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(resultsPerPage)
    setPage(0)
    props.onTemplatePageUpdate({
      pageNumber: 1,
      resultsPerPage,
    })
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (Template: string) => selected.indexOf(Template) !== -1

  return (
    <div className={classes.root}>
      <TemplateListModal
        categoriesData={props.categoriesData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        templateId={selectedTemplateId}
        onSubmitHandler={onSubmitHandler}
      />
      <Paper className={classes.paper}>
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
              rowCount={props.templateData.length}
            />
            <TableBody>
              {stableSort(props.templateData, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Template)
                  const labelId = `enhanced-table-checkbox-${index}`

                  const onTemplateIdClickHandler = (temnplateId: string) => {
                    setSelectedTemplateId(temnplateId)
                    setOpenModal(true)
                  }

                  return (
                    <TableRow hover onClick={(event) => handleClick(event, row.Template)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.Template} selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton aria-label="editIcon">
                            <EditIcon onClick={() => {props.onTemplateIdEditClickHandler(row.Template_id as string)}} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                        <div
                          role="button"
                          tabIndex={0}
                          className="template-modal-link"
                          onClick={() => {onTemplateIdClickHandler(row.Template_id as string)}}
                        >
                          {row.Template_id}
                        </div>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.Template}
                      </TableCell>
                      <TableCell align="right">
                        {row.Version}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.totalResults}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  )
}

interface ITemplateListTableProps {
  onTemplatePageUpdate: (object: templateFilterObject) => void
  setLoadingTemplate: Dispatch<SetStateAction<boolean>>
  // eslint-disable-next-line react/no-unused-prop-types
  templateData: Types.TemplateData[]
  totalResults: number
  categoriesData: Types.CategoriesData[]
  onSubmitUpdateTemplateInformationHandler: (object: Types.UpdateTemplateData) => void
  onTemplateItemsSelected: (items: string[]) => void
  onTemplateIdEditClickHandler: (templateId: string) => void
}
