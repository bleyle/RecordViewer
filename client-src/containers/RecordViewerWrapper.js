import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import RecordViewer from '../components/RecordViewer';

// Presentational Component that uses state to decide how to
// construct the RecordViewer.
const mapStateToProps = (state) => {
  if (state.record.record) {
    return {
      screen: 'RECORD',
      record: state.record.record,
      mode: state.record.mode,
      creds: state.login,
      picklists: state.picklists,
      rawjson: state.rawjson,
      error: state.error
    }
  } else if (state.record.recordId) {
    return {
      screen: 'FETCH_RECORD',
      recordId: state.record.recordId,
      mode: 'View',
      creds: state.login,
      rawjson: state.rawjson,
      error: state.error
    }
  } else {
    // TODO: Do these based on last fetch time instead.
    let updateItems = ('recentItems' in state.recentitems) ? state.recentitems.recentItems.length == 0 : false;
    let updateEntities = ('sobjects' in state.entities) ? state.entities.sobjects.length == 0 : false;

    return {
      screen: 'RECENT',
      updateItems: updateItems,
      updateEntities: updateEntities,
      entities: state.entities,
      recentItems: state.recentitems,
      creds: state.login,
      rawjson: state.rawjson,
      error: state.error
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloneClick: (creds, id) => {
      dispatch(actions.fetchCloneDefaults(creds, id))
    },
    onFetchRecord: (creds, id) => {
      dispatch(actions.fetchRecord(creds, id))
    },
    onRecordClick: (creds, id) => {
      dispatch(actions.fetchRecord(creds, id))
    },
    onNewRecordClick: (creds, apiName) => {
      dispatch(actions.fetchCreateDefaults(creds, apiName))
    },
    onCloneClick: (creds, id) => {
      dispatch(actions.fetchCloneDefaults(creds, id))
    },
    onDeleteClick: (creds, id) => {
      dispatch(actions.deleteRecord(creds, id))
    },
    onEditClick: () => {
      dispatch(actions.editRecord())
    },
    onSaveClick: (creds, id, objectInfo, editValues) => {
      dispatch(actions.saveRecord(creds, id, objectInfo, editValues))
    },
    onSaveNewClick: (creds, apiName, objectInfo, editValues) => {
      dispatch(actions.createRecord(creds, apiName, objectInfo, editValues))
    },
    onFetchEntities: (creds) => {
      dispatch(actions.fetchEntities(creds))
    },
    onFetchRecentItems: (creds) => {
      dispatch(actions.fetchRecentItems(creds))
    },
    onBackClick: () => {
      dispatch(actions.clearRecord())
    },
    onFieldValueUpdate: (field, value) => {
      dispatch(actions.updateFieldValue(field, value))
    },
    onFetchPicklist: (creds, url) => {
      dispatch(actions.fetchPicklist(creds, url));
    }
  }
}

const RecordViewerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
) (RecordViewer)

export default RecordViewerWrapper
