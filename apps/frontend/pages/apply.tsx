// import React, { useState } from 'react';
// import ApplyForm from '../components/apply/ApplyForm';
// import ApplySuccessPopup from '../components/apply/ApplySuccessPopup';
// import { useRouter } from 'next/router';
// import { createApplication } from '../utils/api/mongo/application/createApplicationApi';
// import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//
// export function ApplyPage() {
//     const [formData, setFormData] = useState({
//         contactName: '',
//         companySite: '',
//         email: '',
//     });
//
//     const [showPopup, setShowPopup] = useState(false);
//     const router = useRouter();
//
//     const handleChange = (fieldName, fieldValue) => {
//         setFormData(prevState => ({
//             ...prevState,
//             [fieldName]: fieldValue
//         }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await createApplication({
//                 contactName: formData.contactName,
//                 companySite: formData.companySite,
//                 email: formData.email,
//                 cohort: 'July 1st - August 31st 2023'
//             });
//             setShowPopup(true);
//         } catch (error) {
//             console.error('Error applying:', error);
//         }
//     };
//
//     const closePopupAndRedirect = () => {
//         setShowPopup(false);
//         router.push('/')
//     };
//
//     return (
//         <div>
//             <div className="min-h-screen bg-reviewDrumLightGray flex flex-col items-center justify-start overflow-auto pt-8">
//                 <h1 className="text-3xl mb-4 mt-4 text-center font-semibold text-reviewDrumDarkGray">Apply</h1>
//                 <h2 className="text-lg mb-2 text-center font-semibold text-reviewDrumDarkGray">Next Cohort: July 1st - August 31st</h2>
//                 <h2 className="text-lg mb-4 text-center font-semibold text-reviewDrumDarkGray">Application Deadline: June 28th</h2>
//
//                 <ApplyForm
//                     formData={formData}
//                     handleChange={handleChange}
//                     handleSubmit={handleSubmit}
//                 />
//
//                 <div className="mt-8 w-5/6 max-w-md mx-auto">
//                     <Accordion>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography>What is a clinic cohort?</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Typography>
//                                 {'A clinic cohort is a group of clinics receiving our services at the same time. Behind the scenes, we apply learnings from each clinic to improve the outcomes of the whole group.'}
//                             </Typography>
//                         </AccordionDetails>
//                     </Accordion>
//
//                     <Accordion>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography>What is the discount?</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Typography>
//                                 {'For the July 1st - August 31st 2023 cohort, we\'re offering a set number of clinics a 100% discount on our highest level service.'}
//                             </Typography>
//                         </AccordionDetails>
//                     </Accordion>
//
//                     <Accordion>
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography>What happens after I apply?</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Typography>
//                                 {'If you\'ve applied before the deadline, we\'ll reach out to you with our decision before the cohort begins.'}
//                             </Typography>
//                         </AccordionDetails>
//                     </Accordion>
//                 </div>
//
//                 <div className="mb-12"></div>
//
//                 <ApplySuccessPopup open={showPopup} handleClose={closePopupAndRedirect} />
//             </div>
//         </div>
//     );
// }
//
// export default ApplyPage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ApplyPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/");
    }, []);

    return null;
}
