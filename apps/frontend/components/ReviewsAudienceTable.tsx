import React from 'react';

const ReviewsAudienceTable = ({ audienceData }) => {
    return (
        <div className="w-full lg:p-8 text-sm">
            <div className="w-11/12 mx-auto sm:w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            {/* Add responsive text classes */}
                            {[
                                'Audience Name',
                                '# of Google Reviews',
                                '# of RateMDs Reviews',
                                '# of Total Reviews',
                                'Age Range',
                                'Interests (Used for Targeting)',
                            ].map((header, index) => (
                                <th
                                    key={index}
                                    className="p-1 sm:p-4 text-xs lg:text-xl border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold"
                                >
                                    {header}
                                </th>
                            ))}
                            <th className="p-2 sm:p-4 text-xs border-b border-reviewDrumMedGray hidden lg:table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {audienceData.map((row, index) => (
                            <tr key={index} className="bg-reviewDrumLightGray odd:bg-white">
                                <td className="p-2 sm:p-4 text-xs lg:text-xl border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                    {row.name}
                                    <div className="mt-2 lg:hidden">
                                        <button className="bg-reviewDrumBlue text-reviewDrumLightGray p-1 rounded text-xs">
                                            Start Campaign
                                        </button>
                                    </div>
                                </td>

                                {['googleReviews', 'rateMDsReviews', 'totalReviews', 'age'].map((field, fieldIndex) => (
                                    <td
                                        key={fieldIndex}
                                        className="p-1 sm:p-4 text-xs lg:text-lg border-b border-reviewDrumMedGray text-reviewDrumDarkGray"
                                    >
                                        {row[field]}
                                    </td>
                                ))}
                                <td className="p-2 sm:p-4 text-xs lg:text-md border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                    {row.interests}
                                </td>
                                <td className="px-2 border-b border-reviewDrumMedGray text-center hidden lg:table-cell">
                                    <button className="bg-reviewDrumBlue text-reviewDrumLightGray py-1 px-2 rounded text-xs lg:text-lg">
                                        Start Campaign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewsAudienceTable;
