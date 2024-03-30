// @ts-check
// TODO: Modify this to be agency contract
import React from 'react';
import { getUserAndTokenFromCookies } from '../../utils/secret';
import { useRouter } from 'next/router';
import { retrieveAgencyContractByAgencyId } from '../../api/agency_contract_api';
import { Button } from '@mui/material';

// TODO: make sure only agencies that are placed with the student can download the documents on this page

/**
 * @param {int} agencyId ID of the agency whose contract is being viewed
 * @param {Array.<{id: int, agencyId: int, agencyContractName: string, agencyContractData: Blob}>} agency_contracts array of entries in the 'document' table
 */
function ViewAgencyContractAgency({ token, user, agencyId, agency_contracts }) {
	
    const router = useRouter();
	
	if (agency_contracts.length > 0) {
		return (
			<center>
				<h1>Student Documents</h1>
				{agency_contracts.map((item, index) => (
					<div key={item.id}>
						<label>{`${item.agencyContractName}`}</label>
						<Button onClick={(e) => {
							const str = (new Buffer(item.agencyContractData, 'binary')).toString('utf8');
							const url = window.URL.createObjectURL(new Blob([str], {type: 'application/pdf'}));

							var downloadElem = document.createElement('a');
							downloadElem.href = url;
							downloadElem.download = `${item.agencyContractName}.pdf`;
							downloadElem.click();

							window.URL.revokeObjectURL(url);
							if (document.contains(downloadElem)) {
								document.removeChild(downloadElem);
							}
							
						}}>Download</Button>
					</div>
				))}
			</center>
		)
	} else {
		return (
			<center>
				<h1>No contract found for this agency</h1>
			</center>
		)
	}
}

export default ViewAgencyContractAgency;

ViewAgencyContractAgency.getInitialProps = async ({ req, query }) => {
	
	const { token, user } = getUserAndTokenFromCookies(req);
	
	var agencyId = null;
	
	if (query.id) {
		agencyId = query.id;
	}
	
	var documents = [];
    
	if ((token && user) && agencyId) {
		documents = await retrieveAgencyContractByAgencyId(token, agencyId);
	}
	
    if (!documents) {
		documents = [];
	}

    return { token, user, agencyId, documents };
}