import DownloadCampaignButton from '../components/CampaignsSidebar/DownloadCampaignButton';
import SidebarCampaignOverview from '../components/CampaignsSidebar/SidebarCampaignOverview';
import SidebarClaimViewer from '../components/CampaignsSidebar/SidebarClaimViewer';
import SidebarCopyViewer from '../components/CampaignsSidebar/SidebarCopyViewer';
import SidebarHookViewer from '../components/CampaignsSidebar/SidebarHookViewer';
import ContentCanvas from '../components/ContentCanvas';
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
    const [reviews, setReviews] = useState([
        'This is a short review.',
        'This is a medium-length review with some more details about the experience.',
        "This is a long review that describes the whole experience in depth, from the customer's perspective.",
    ]);

    const [copy, setCopy] = useState('');
    const [copyPosition, setCopyPosition] = useState(1);
    const [copies, setCopies] = useState([
        'This is a short copy.',
        'This is a medium-length copy that covers more information.',
        'This is a longer copy that provides an even more detailed view of the topic.',
    ]);

    const [hook, setHook] = useState('');
    const [hookPosition, setHookPosition] = useState(1);
    const [hooks, setHooks] = useState([
        'This is a short hook.',
        'This is a medium-length hook that covers more information.',
        'This is a longer hook that provides an even more detailed view of the topic.',
    ]);

    const [claim, setClaim] = useState('');
    const [claimPosition, setClaimPosition] = useState(1);
    const [claims, setClaims] = useState([
        'This is a short claim.',
        'This is a slightly longer claim that covers more points.',
        'This is a long claim that spans several sentences and provides a comprehensive overview.',
    ]);

    const [close, setClose] = useState('');
    const [closePosition, setClosePosition] = useState(1);
    const [closes, setCloses] = useState([
        'Short close.',
        'A medium-length close that ends with a call to action.',
        'A longer close that provides a summary and a strong call to action.',
    ]);

    return (
        <div className="bg-reviewDrumLightGray">
            <div className="w-full min-w-fit">
                <TopNav />
                <div className="bg-black min-h-screen min-w-fit w-full text-white flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row flex-grow">
                        {/* Sidebar */}
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
                                textArray={reviews}
                                // textArray={reviews.map((review) => review.reviewText)}
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
                                textArray={copies}
                                // textArray={copies.map((copy) => copy.copyText)}
                                position={copyPosition}
                                rows={2}
                            />

                            <SidebarHookViewer
                                hookPosition={hookPosition}
                                setHookPosition={setHookPosition}
                                totalHooks={hooks.length}
                            />
                            <SidebarTextArea
                                textArray={hooks}
                                // textArray={hooks.map((hook) => hook.hookText)}
                                position={hookPosition}
                                rows={2}
                            />

                            <SidebarClaimViewer
                                claimPosition={claimPosition}
                                setClaimPosition={setClaimPosition}
                                totalClaims={claims.length}
                            />
                            <SidebarTextArea
                                textArray={claims}
                                // textArray={claims.map((claim) => claim.claimText)}
                                position={claimPosition}
                                rows={2}
                            />

                            <hr className="w-11/12 self-end dark:border-slate-500" />

                            <DownloadCampaignButton userId={user._id?.toString()} />
                        </div>
                        <ContentCanvas hooks={hooks} claims={claims} reviews={reviews} closes={closes} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignsPage;
