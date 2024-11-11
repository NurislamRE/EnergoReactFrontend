import style from './Filter.module.css';
import { useEffect, useState } from 'react';
import { useGetOrganizationsQuery } from '../../../services/dictionary';
import PostPreloader from '../../../UI/PostPreloader';
import ErrorMessage from '../../ErrorMessage';
import SearchIcon from '@mui/icons-material/Search';
import DictionaryData  from '../DictionaryData/'

export const Filter = ({ orgId, orgName }) => {

  const { data: organizations, error, isLoading } = useGetOrganizationsQuery({ orgId: orgId });
  const [state, setState] = useState({
    selectOrganization: orgId,
    selectOrganizationText: orgName,
  });

  const handleSelectOrganization = (e) => {
    let updatedValue = { selectOrganization: e.target.value, selectOrganizationText: e.target.options[e.target.selectedIndex].text }

    setState(state => ({
      ...state,
      ...updatedValue
    }));
  }

  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <center>
          <PostPreloader />
        </center>
      ) : organizations ? (
        <>
          <div className='col-md-4' style={{ float: 'left' }}>
            <strong><h4>{state.selectOrganizationText}</h4></strong>
            <p>Справочник</p>
          </div>
          <div className='col-md-3'>
            <fieldset style={{ float: 'left', marginRight: '1vh', width:'20vw' }}>
              <legend>Организация:</legend>

              <select className='form-select' style={{ marginBottom: '1vh' }} onChange={handleSelectOrganization}>
              {organizations.map(organization => (
                  organization.id == 1 ?
                    <option selected value={organization.id}>{organization.name}</option> :
                    <option value={organization.id}>
                      {organization.name}
                    </option>
                ))}
              </select>

            </fieldset>
          </div>
        </>
      ) : null}
      <DictionaryData
        organization={state.selectOrganization}
      />     
    </>

  );
};
