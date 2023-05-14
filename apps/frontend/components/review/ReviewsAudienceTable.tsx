import React from 'react';

const ReviewsAudienceTable = ({ audienceData }) => {
    return (
        <div className="w-full lg:p-8">
            <div className="py-6 mx-0 text-2xl font-semibold text-center"># of Reviews per Audience</div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        {[
                            'Audience Name',
                            '# of Google Reviews',
                            '# of RateMDs Reviews',
                            '# of Total Reviews',
                            'Age Range',
                            'Interests',
                        ].map((header, index) => (
                            <th
                                key={index}
                                className="p-2 md:p-4 text-xs lg:text-xl border-b border-reviewDrumMedGray text-reviewDrumLightGray font-bold"
                            >
                                {header}
                            </th>
                        ))}
                        <th className="p-2 md:p-4 text-xs border-b border-reviewDrumMedGray hidden lg:table-cell"></th>
                    </tr>
                </thead>
                <tbody>
                    {audienceData.map((row, index) => (
                        <tr key={index} className="bg-reviewDrumLightGray odd:bg-white">
                            <td className="p-2 md:p-4 text-s lg:text-xl border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                {row.name}
                                <div className="mt-2 lg:hidden">
                                    <button className="bg-reviewDrumBlue text-white p-1 rounded text-xs">
                                        Start Campaign
                                    </button>
                                </div>
                            </td>

                            {['googleReviews', 'rateMDsReviews', 'totalReviews', 'age'].map((field, fieldIndex) => (
                                <td
                                    key={fieldIndex}
                                    className="p-2 text-xs lg:text-lg border-b border-reviewDrumMedGray text-reviewDrumDarkGray"
                                >
                                    {row[field]}
                                </td>
                            ))}
                            <td className="p-2 md:p-4 text-xs lg:text-lg border-b border-reviewDrumMedGray text-reviewDrumDarkGray">
                                {row.interests}
                            </td>
                            <td className="px-2 border-b border-reviewDrumMedGray text-center hidden lg:table-cell">
                                <button className="bg-reviewDrumBlue text-white py-1 px-2 rounded text-xs lg:text-md">
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
