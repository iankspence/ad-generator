import DownloadCampaignButton from '../components/CampaignsSidebar/DownloadCampaignButton';
import SidebarCampaignOverview from '../components/CampaignsSidebar/SidebarCampaignOverview';
import SidebarClaimViewer from '../components/CampaignsSidebar/SidebarClaimViewer';
import SidebarCopyViewer from '../components/CampaignsSidebar/SidebarCopyViewer';
import SidebarHookViewer from '../components/CampaignsSidebar/SidebarHookViewer';
import SidebarReviewViewer from '../components/ReviewsSidebar/SidebarReviewViewer';
import SidebarTextArea from '../components/ReviewsSidebar/SidebarTextArea';
import TopNav from '../components/TopNav';
import UserContext from '../contexts/UserContext';
import React, { useContext, useState } from 'react';

function CampaignsPage() {
    const user = useContext(UserContext);
    const account = user?.account;

    const [reviewPosition, setReviewPosition] = useState(1);
    const [totalReviews, setTotalReviews] = useState(30);
    const [reviews, setReviews] = useState([]);

    const [copy, setCopy] = useState('');
    const [copyPosition, setCopyPosition] = useState(1);
    const [copies, setCopies] = useState([]);

    const [hook, setHook] = useState('');
    const [hookPosition, setHookPosition] = useState(1);
    const [hooks, setHooks] = useState([]);

    const [claim, setClaim] = useState('');
    const [claimPosition, setClaimPosition] = useState(1);
    const [claims, setClaims] = useState([]);

    return (
        <div className="bg-reviewDrumLightGray">
            <div className="w-full min-w-fit">
                <TopNav />
                <div className="bg-black min-h-screen min-w-fit w-full text-white flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row flex-grow">
                        <div
                            className="flex flex-col items-center bg-reviewDrumDarkGray pt-4"
                            style={{
                                flexBasis: '25%',
                                minWidth: '400px',
                            }}
                        >
                            <h2 className="text-reviewDrumMedGray text-3xl font-roboto mb-4">Campaigns</h2>
                            <hr className="w-11/12 self-end dark:border-slate-500" />
                            <SidebarCampaignOverview audience="Audience Name" adsSelected="2/25" />
                            <hr className="w-11/12 self-end dark:border-slate-500" />
                            <SidebarReviewViewer
                                reviewPosition={reviewPosition}
                                setReviewPosition={setReviewPosition}
                                totalReviews={totalReviews}
                            />
                            <SidebarTextArea
                                textArray={reviews.map((review) => review.reviewText)}
                                position={reviewPosition}
                                rows={2}
                            />
                            <hr className="w-11/12 self-end dark:border-slate-500" />

                            <SidebarCopyViewer
                                copyPosition={copyPosition}
                                setCopyPosition={setCopyPosition}
                                totalCopies={copies.length}
                            />
                            <SidebarTextArea
                                textArray={copies.map((copy) => copy.copyText)}
                                position={copyPosition}
                                rows={2}
                            />

                            <SidebarHookViewer
                                hookPosition={hookPosition}
                                setHookPosition={setHookPosition}
                                totalHooks={hooks.length}
                            />
                            <SidebarTextArea
                                textArray={hooks.map((hook) => hook.hookText)}
                                position={hookPosition}
                                rows={2}
                            />

                            <SidebarClaimViewer
                                claimPosition={claimPosition}
                                setClaimPosition={setClaimPosition}
                                totalClaims={claims.length}
                            />
                            <SidebarTextArea
                                textArray={claims.map((claim) => claim.claimText)}
                                position={claimPosition}
                                rows={2}
                            />

                            <hr className="w-11/12 self-end dark:border-slate-500" />

                            <DownloadCampaignButton userId={user._id?.toString()} />
                        </div>
                    </div>

                    <div className="w-full md:w-3/4 flex-grow">
                        {/* Add main content components for Campaigns page here */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignsPage;
