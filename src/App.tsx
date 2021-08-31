/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/App.tsx
*/

import React from 'react'
import './App.scss'
import { createStyles, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CustomizedSearchInput from './components/CustomizedSearchInput/CustomizedSearchInput'
import SearchRadioButtons from './components/SearchRadioButtons/SearchRadioButtons'
import MultilineLogTail from './components/MultilineLogTail/MultilineLogTail'
import TemplateListTable from './components/TemplateListTable/TemplateListTable'
import TimeSelectorPicker from './components/TimeSelectorPicker/TimeSelectorPicker'
import WordCloudWidget from './widgets/WordCloudWidget/WordCloudWidget'
import ParsedDataTable from './components/ParsedDataTable/ParsedDataTable'
import LineChartWidget from './widgets/LineChartWidget/LineChartWidget'
import HistogramChartWidget from './widgets/HistogramChartWidget/HistogramChartWidget'
import DonutChartWidget from './widgets/DonutChartWidget/DonutChartWidget'
import { Types as WordCloudType } from './widgets/WordCloudWidget/types'
import { Types as LineType } from './widgets/LineChartWidget/types'
import { Types as BarType } from './widgets/BarChartWidget/types'
import { Types as DonutType } from './widgets/DonutChartWidget/types'
import { Types as HistogramType } from './widgets/HistogramChartWidget/types'
import { getLogsOverTimeData } from './recoil/selectors/logsOverTimeSelectors'
import { templateState } from './recoil/atoms/templateAtoms'
import {
  initToast,
  initVariablesFilterObject,
  notificationTypesEnums,
  randomToastId,
  templateFilterObject,
  variablesFilterObject,
} from './model'
import { Types } from './types'
import { SubmitTemplate } from './recoil/submit/SubmitTemplate'
import { SubmitVariable } from './recoil/submit/SubmitVariable'
import { SubmitKeywords } from './recoil/submit/SubmitKeywords'
import { SubmitPieData } from './recoil/submit/SubmitPieData'
import { SubmitCategories } from './recoil/submit/SubmitCategories'
import { AddCategory } from './recoil/submit/AddCategory'
import { UpdateTemplateInformation } from './recoil/submit/UpdateTemplateInformation'
import { toastState } from './recoil/atoms/toastAtoms'
import TemplateNameInput from './components/TemplateNameInput/TemplateNameInput'
import { SubmitFields } from './recoil/submit/SubmitFields'
import { SubmitUpdateFields } from './recoil/submit/SubmitUpdateFields'
import TemplateButtons from './components/TemplateButtons/TemplateButtons'
import BrushChartWidget from './widgets/BrushChartWidget/BrushChartWidget'
import BarChartWidget from './widgets/BarChartWidget/BarChartWidget'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '100px 20px 20px 20px',
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
)

function App() {

  // Toast
  const setToastState = useSetRecoilState(toastState)

  // Start & End date

  const [selectedStartDate, setSelectedStartDate] = React.useState('05/12/21') // yesterday - const dayBefore = 1; new Date(Date.now() - dayBefore*24*60*60*1000)
  const [selectedEndDate, setSelectedEndDate] = React.useState((new Date()).toISOString().slice(0, 10))

  const updateStartEndTimeHandler = (startDate: string, endDate: string, isRealTime: boolean) => {
    if (isRealTime) {
      // TODO
    } else {
      setSelectedStartDate(startDate)
      setSelectedEndDate(endDate)
      if (startDate <= endDate) {
        setLoadingVariables(true)
      }
    }
  }

  const onDateSelectedHandler = (date: string) => {
    updateStartEndTimeHandler(date, date, false)
  }

  // Template data

  const [loadingTemplate, setLoadingTemplate] = React.useState(false)
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [templateFilterState, setTemplateFilterState] = useRecoilState(templateState)
  const [templateData, setTemplateData] = React.useState<Types.TemplateData[]>([])
  const [totalTemplateResults, setTotalTemplateResults] = React.useState(0)
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [templatePageNumber, setTemplatePageNumber] = React.useState(1)
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [templateResultsPerPage, setTemplateResultsPerPage] = React.useState(5)
  const [loadingTemplateDataRequestInProgress, setLoadingTemplateDataRequestInProgress] = React.useState('')

  // Categories
  const [loadingCategories, setLoadingCategories] = React.useState(true)
  const [categoriesData, setCategoriesData] = React.useState<Types.CategoriesData[]>([{ value: '' }])
  const [loadingCategoriesDataRequestInProgress, setLoadingCategoriesDataRequestInProgress] = React.useState('')
  // Add categories
  const [loadingAddCategory, setLoadingAddCategory] = React.useState(false)
  const [loadingAddCategoryRequestInProgress, setLoadingAddCategoryRequestInProgress] = React.useState('')
  // Update categories
  const [loadingUpdateTemplateInfo, setLoadingUpdateTemplateInfo] = React.useState(false)
  const [updateTemplateData, setUpdateTemplateData] = React.useState<Types.UpdateTemplateData>({ name: '', category: '', fields: '' })
  const [loadingUpdateTemplateInProgress, setLoadingUpdateTemplateInProgress] = React.useState('')

  // template selected items
  const [selectedTemplateItems, setSelectedTemplateItems] = React.useState<string[]>([''])
  const [filterTemplateType, setFilterTemplateType] = React.useState('')

  // edit template id
  const [selectedTemplateIdToEdit, setSelectedTemplateIdToEdit] = React.useState('')

  const onTemplateRequestCompleteHandler = (data: Types.TemplateData[], newPageNumber: number, newResultsPerPage: number, totalResults: number) => {
    setTemplateData(data)
    setLoadingTemplate(false)
    setTotalTemplateResults(totalResults)
    setTemplatePageNumber(newPageNumber)
    setTemplateResultsPerPage(newResultsPerPage)
  }

  const onCategoriesRequestCompleteHandler = (data: Types.CategoriesData[]) => {
    setLoadingCategories(false)
    setCategoriesData(data)
  }

  const onSubmitUpdateTemplateInformationHandler = (object: Types.UpdateTemplateData) => {
    setUpdateTemplateData(object)
    setLoadingUpdateTemplateInfo(true)
    setLoadingAddCategory(true)
  }

  const onTemplateItemsSelected = (items: string[]) => {
    setSelectedTemplateItems(items)
  }

  const onTemplateIdEditClickHandler = (templateId: string) => {
    try {
      window.scroll({
        top: 1500,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      // older browsers fallback
      window.scrollTo(0, 1500)
    }
    // alert(templateId)
    setSelectedTemplateIdToEdit(templateId)
  }

  const onAddCategoryRequestCompleteHandler = (data: Types.CategoriesData[]) => {
    setLoadingAddCategory(false)
    setCategoriesData(data)
  }

  const onTemplateUpdatedHandler = (name: string, category: string) => {
    const updateTemplateDataObject: Types.UpdateTemplateData = {
      name,
      category,
      fields: '',
    }
    setUpdateTemplateData(updateTemplateDataObject)
    setLoadingUpdateTemplateInfo(true)
    setLoadingAddCategory(true)
  }

  const onUpdateTemplateRequestCompleteHandler = (status: string) => {
    setLoadingUpdateTemplateInfo(false)
    setToastState(initToast(randomToastId(), status === 'success' ? notificationTypesEnums.Success : notificationTypesEnums.Fail, 'Template was updated successfully'))
    setSelectedTemplateIdToEdit('')
  }

  const filterTemplatesHandler = (filterType: string) => { // combine, filter, similar
    setFilterTemplateType(filterType)
    setLoadingTemplate(true)
  }

  // Variable data

  const [loadingVariables, setLoadingVariables] = React.useState(false)
  const [variableData, setVariableData] = React.useState<Types.VariablesData[]>([])
  const [variablesFilter, setVariablesFilter] = React.useState(initVariablesFilterObject)
  const [loadingVariablesRequestInProgress, setLoadingVariablesRequestInProgress] = React.useState('')

  const [loadingFields, setLoadingFields] = React.useState(true)
  const [fieldsNameData, setFieldsNameData] = React.useState<Types.FieldsData[]>([{ value: '' }])
  const [loadingFieldsDataRequestInProgress, setLoadingFieldsDataRequestInProgress] = React.useState('')

  const [loadingUpdateFields, setLoadingUpdateFields] = React.useState(false)
  const [updateFieldsNameData, setUpdateFieldsNameData] = React.useState({ oldName: '', newName: '' })
  const [loadingUpdateFieldsDataRequestInProgress, setLoadingUpdateFieldsDataRequestInProgress] = React.useState('')

  const onUpdateName = (oldName: string, newName: string) => {
    setUpdateFieldsNameData({ oldName, newName })
    setLoadingUpdateFields(true)
  }

  const onUpdateFieldName = (oldName: string, newName: string) => {
    setUpdateFieldsNameData({ oldName, newName })
    setLoadingUpdateFields(true)
  }

  const onUpdateFieldsRequestCompleteHandler = (status: string) => {
    setLoadingUpdateFields(false)
    setToastState(initToast(randomToastId(), status === 'success' ? notificationTypesEnums.Success : notificationTypesEnums.Fail, 'Field was updated successfully'))
  }

  const onFieldsRequestCompleteHandler = (data: Types.FieldsData[]) => {
    setLoadingFields(false)
    setFieldsNameData(data)
  }

  const onVariablesRequestCompleteHandler = (data: Types.VariablesData[], pageNumber: number, resultsPerPage: number, totalResults: number) => {
    setLoadingVariables(false)
    setVariableData(data)

    const object:variablesFilterObject = {
      pageNumber,
      resultsPerPage,
      totalResults,
      startDate: variablesFilter.startDate,
      endDate: variablesFilter.endDate,
      category: variablesFilter.category,
      templateName: variablesFilter.templateName
    }
    setVariablesFilter(object)
  }

  const onVariablesPageUpdate = (object: variablesFilterObject) => {
    if (!loadingVariables) {
      setVariablesFilter(object)
      setLoadingVariables(true)
    }
  }

  const onTemplatePageUpdate = (object: templateFilterObject) => {
    if (!loadingTemplate) {
      setTemplateFilterState(object)
      setLoadingTemplate(true)
      setLoadingKeywords(true)
    }
  }

  // Tail data

  const logsData = useRecoilValue(getLogsOverTimeData)

  // log radio buttons state
  const [radioButtonsState, setRadioButtonsState] = React.useState<Types.LogRadioState>({
    both: true,
    templates: false,
    variables: false,
  })

  const updateTailStateHandler = (value: string, checked: boolean) => {
    const change: Types.LogRadioState = {
      both: false,
      templates: false,
      variables: false,
    }
    // @ts-ignore
    change[value] = checked
    setRadioButtonsState(change)
  }

  const updateTailSearchResultsHandler = (value: string) => {
    setTailSearch(value)
  }

  // Pie data

  const [loadingPieData, setLoadingPieData] = React.useState(true)
  const [loadingPieDataRequestInProgress, setLoadingPieDataRequestInProgress] = React.useState('')

  const [pieMetric, setPieMetric] = React.useState('template_version')
  const [pieData, setPieData] = React.useState<DonutType.Data[]>([{ name: '', value: 0 }])
  const onPieMetricChangeHandler = (metric: string) => {
    setPieMetric(metric)
    setLoadingPieData(true)
  }

  const onPieDataRequestCompleteHandler = (data: DonutType.Data[], metric: string) => {
    setLoadingPieData(false)
    setPieData(data)
  }

  // Keyword data

  const [loadingKeywords, setLoadingKeywords] = React.useState(true)
  const [loadingKeywordDataRequestInProgress, setLoadingKeywordDataRequestInProgress] = React.useState('')

  const [keywordsData, setKeywordsData] = React.useState<WordCloudType.Data[]>([{ text: '', value: 0 }])
  const [tailSearch, setTailSearch] = React.useState('')

  const onKeywordsRequestCompleteHandler = (data: WordCloudType.Data[], newPageNumber: number, newResultsPerPage: number, totalResults: number) => {
    setLoadingKeywords(false)
    setKeywordsData(data)
  }

  // handle word cloud events
  const onWordCloudKeywordsSelectedHandler = (str: string) => {
    setTailSearch(str)
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      {loadingTemplate && <SubmitTemplate onTemplateRequestCompleteHandler={onTemplateRequestCompleteHandler} pageNumber={templateFilterState.pageNumber} resultsPerPage={templateFilterState.resultsPerPage} filterTemplateType={filterTemplateType} loadingTemplateDataRequestInProgress={loadingTemplateDataRequestInProgress} setLoadingTemplateDataRequestInProgress={setLoadingTemplateDataRequestInProgress} />}
      {loadingVariables && <SubmitVariable onVariablesRequestCompleteHandler={onVariablesRequestCompleteHandler} variablesFilter={variablesFilter} startDate={selectedStartDate} endDate={selectedEndDate} loadingVariablesRequestInProgress={loadingVariablesRequestInProgress} setLoadingVariablesRequestInProgress={setLoadingVariablesRequestInProgress} />}
      {loadingPieData && <SubmitPieData onPieDataRequestCompleteHandler={onPieDataRequestCompleteHandler} pieMetric={pieMetric} loadingPieDataRequestInProgress={loadingPieDataRequestInProgress} setLoadingPieDataRequestInProgress={setLoadingPieDataRequestInProgress} />}
      {loadingKeywords && <SubmitKeywords onKeywordsRequestCompleteHandler={onKeywordsRequestCompleteHandler} variablesFilter={variablesFilter} startDate={selectedStartDate} endDate={selectedEndDate} setLoadingKeywordDataRequestInProgress={setLoadingKeywordDataRequestInProgress} loadingKeywordDataRequestInProgress={loadingKeywordDataRequestInProgress} />}
      {loadingCategories && <SubmitCategories onCategoriesRequestCompleteHandler={onCategoriesRequestCompleteHandler} loadingCategoriesDataRequestInProgress={loadingCategoriesDataRequestInProgress} setLoadingCategoriesDataRequestInProgress={setLoadingCategoriesDataRequestInProgress} />}
      {loadingAddCategory && <AddCategory onAddCategoryRequestCompleteHandler={onAddCategoryRequestCompleteHandler} loadingAddCategoryRequestInProgress={loadingAddCategoryRequestInProgress} setLoadingAddCategoryRequestInProgress={setLoadingAddCategoryRequestInProgress} category={updateTemplateData.category} />}
      {loadingUpdateTemplateInfo && <UpdateTemplateInformation onUpdateTemplateRequestCompleteHandler={onUpdateTemplateRequestCompleteHandler} loadingUpdateTemplateInProgress={loadingUpdateTemplateInProgress} setLoadingUpdateTemplateInProgress={setLoadingUpdateTemplateInProgress} templateData={updateTemplateData} />}
      {loadingFields && <SubmitFields onFieldsRequestCompleteHandler={onFieldsRequestCompleteHandler} loadingFieldsDataRequestInProgress={loadingFieldsDataRequestInProgress} setLoadingFieldsDataRequestInProgress={setLoadingFieldsDataRequestInProgress} />}
      {loadingUpdateFields && <SubmitUpdateFields onUpdateFieldsRequestCompleteHandler={onUpdateFieldsRequestCompleteHandler} loadingUpdateFieldsDataRequestInProgress={loadingUpdateFieldsDataRequestInProgress} setLoadingUpdateFieldsDataRequestInProgress={setLoadingUpdateFieldsDataRequestInProgress} updateFieldsNameData={updateFieldsNameData} />}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="resize size200 vertical">
            <Paper className={classes.paper} style={{ minHeight: 200, overflow: 'auto' }}>
              <CustomizedSearchInput updateTailSearchResultsHandler={updateTailSearchResultsHandler} tailSearch={tailSearch} setTailSearch={setTailSearch} />
              <SearchRadioButtons updateTailStateHandler={updateTailStateHandler} />
              <TimeSelectorPicker
                updateStartEndTimeHandler={updateStartEndTimeHandler}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
              />
            </Paper>
          </div>
        </Grid>
        <div className="wrap">
          <div className="resize size750 vertical">
            <Grid container>
              <Grid item xs={6}>
                <Paper className={classes.paper} style={{ minHeight: 750, overflow: 'auto' }}>
                  {templateData.length > 1 && <MultilineLogTail templateData={templateData} variableData={variableData} radioButtonsState={radioButtonsState} tailSearch={tailSearch} />}
                  {templateData.length <= 1 && <img className="spinner" src="loader-spinner.png" alt="loader-spinner" />}
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper} style={{ minHeight: 750, overflow: 'auto' }}>
                  <TemplateListTable
                    setLoadingTemplate={setLoadingTemplate}
                    onTemplatePageUpdate={onTemplatePageUpdate}
                    templateData={templateData}
                    totalResults={totalTemplateResults}
                    categoriesData={categoriesData}
                    onSubmitUpdateTemplateInformationHandler={onSubmitUpdateTemplateInformationHandler}
                    onTemplateItemsSelected={onTemplateItemsSelected}
                    onTemplateIdEditClickHandler={onTemplateIdEditClickHandler}
                  />
                  <TemplateButtons
                    filterTemplatesHandler={filterTemplatesHandler}
                    selectedTemplateItems={selectedTemplateItems}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
        <Grid item xs={12}>
          <div className="resize size500 vertical">
            <Paper className={classes.paper}>
              <WordCloudWidget data={keywordsData as WordCloudType.Data[]} onWordCloudKeywordsSelectedHandler={onWordCloudKeywordsSelectedHandler} />
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="resize size240 vertical">
            <Paper className={classes.paper} style={{ minHeight: 240, maxHeight: 240, overflow: 'auto' }}>
              <BrushChartWidget data={logsData as LineType.Data[]} onDateSelectedHandler={onDateSelectedHandler} />
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="resize size250 vertical">
            <Paper className={classes.paper} style={{ minHeight: 500, maxHeight: 600, overflow: 'auto' }}>
              {selectedTemplateIdToEdit !== '' && <TemplateNameInput templateId={selectedTemplateIdToEdit} categoriesData={categoriesData} onTemplateUpdatedHandler={onTemplateUpdatedHandler} /> }
              <ParsedDataTable
                onVariablePageUpdate={onVariablesPageUpdate}
                variableData={variableData}
                variablesFilter={variablesFilter}
                fieldsNameData={fieldsNameData}
                onUpdateName={onUpdateName}
                onUpdateFieldName={onUpdateFieldName}
              />
            </Paper>
          </div>
        </Grid>
        <div className="wrap">
          <div className="resize size430 vertical">
            <Grid container>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <LineChartWidget data={logsData as LineType.Data[]} onDateSelectedHandler={onDateSelectedHandler} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <BarChartWidget data={logsData as BarType.Data[]} onDateSelectedHandler={onDateSelectedHandler} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className="wrap">
          <div className="resize size370 vertical">
            <Grid container>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <DonutChartWidget data={pieData as DonutType.Data[]} metricSelected={pieMetric} onPieMetricChangeHandler={onPieMetricChangeHandler} loadingPieData={loadingPieData} />
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <HistogramChartWidget data={logsData as HistogramType.Data[]} onDateSelectedHandler={onDateSelectedHandler} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>

      </Grid>
    </div>
  )
}

export default App
