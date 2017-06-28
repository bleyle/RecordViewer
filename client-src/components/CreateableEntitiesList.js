import React, { PropTypes } from 'react'

// Component that displays a list of entities for which new records may be created.
// TODO: Add click support.
const CreateableEntitiesList = ({creds, onChange, entities}) => {
  return (
    <div className="slds-m-around--large" style={{"textAlign":"center"}}>
      <div style={{"display":"inline-block","textAlign":"left"}}>
        <div>
          <label className="slds-text-heading--medium slds-p-bottom--medium">Create New Record</label>
        </div>
        <select
          key="createableentitieslist"
          onChange={(event) => {if (event.target.value != "") {onChange(creds, event.target.value)}}}>
          [
            <option key="" value="">Select an entity...</option>
            { entities.sobjects.filter(x => x.createable).map((sobject) => {
            return <option
              key={sobject.name}
              value={sobject.name}>{sobject.label}</option>
            })}
          ]
        </select>
      </div>
    </div>
  )
}

CreateableEntitiesList.propTypes = {
  creds: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  entities: PropTypes.object.isRequired
}

export default CreateableEntitiesList
