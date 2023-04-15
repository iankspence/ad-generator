import React from 'react';

const ReviewsAudienceTable = ({ audienceData }) => {
    return (
        <div className="w-full p-8">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold">
                            Audience Name
                        </th>
                        <th className="p-4 border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold">
                            # of Google Reviews
                        </th>
                        <th className="p-4 border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold">
                            # of RateMDs Reviews
                        </th>
                        <th className="p-4 border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold">
                            # of Total Reviews
                        </th>
                        <th className="p-4 border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold">
                            Age Range
                        </th>
                        <th className="p-4 border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold">
                            Interests (Used for Targeting)
                        </th>
                        <th className="p-4 border-b border-reviewDrumMedGray"></th>
                    </tr>
                </thead>
                <tbody>
                    {audienceData.map((row, index) => (
                        <tr key={index} className="bg-reviewDrumLightGray odd:bg-white">
                            <td className="p-4 border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                {row.name}
                            </td>
                            <td className="p-4 border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                {row.googleReviews}
                            </td>
                            <td className="p-4 border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                {row.rateMDsReviews}
                            </td>
                            <td className="p-4 border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                {row.totalReviews}
                            </td>
                            <td className="p-4 border-b border-reviewDrumMedGray text-reviewDrumDarkGray">{row.age}</td>
                            <td className="p-4 border-b border-reviewDrumMedGray text-reviewDrumDarkGray text-sm">
                                {row.interests}
                            </td>
                            <td className="px-2 border-b border-reviewDrumMedGray text-center">
                                <button className="bg-reviewDrumBlue text-reviewDrumLightGray py-1 px-3 rounded text-sm">
                                    Start Campaign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewsAudienceTable;
