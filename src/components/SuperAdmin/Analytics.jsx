import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import "./Posts.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const Analytics = () => {
    const [maleFemalePieChartData, setMaleFemalePieChartData] = useState(null);
    const [maleFemalePieChartDataForPost, setMaleFemalePieChartDataForPost] =
        useState(null);
    const [ageData, setAgeData] = useState(null);
    const [ageDataForGetDiscovered, setAgeDataForGetDiscovered] = useState(null);
    const [ageDataForDiscoverTalent, setAgeDataForDiscoverTalent] = useState(null);
    const [roleBarChartData, setRoleBarChartData] = useState(null);
    const [roleBarChartDataForPost, setRoleBarChartDataForPost] =
        useState(null);
    const [genderPerRoleData, setGenderPerRoleData] = useState(null);
    const [genderPerRoleDataForPost, setGenderPerRoleDataForPost] =
        useState(null);
    const [
        workBasisBarChartDataForFounder,
        setWorkBasisBarChartDataForFounder,
    ] = useState(null);
    const [
        workBasisBarChartDataForGetDiscovered,
        setWorkBasisBarChartDataForGetDiscovered,
    ] = useState(null);
    const [userTypeBarChartDataForFounder, setUserTypeBarChartDataForFounder] =
        useState(null);
    const [
        userTypeBarChartDataForGetDiscovered,
        setUserTypeBarChartDataForGetDiscovered,
    ] = useState(null);

    const [availableYearsForFounderPosts, setAvailableYearsForFounderPosts] =
        useState([]);
    const [availableYearsForTalentPosts, setAvailableYearsForTalentPosts] =
        useState([]);
    const [selectedYearForTalentPosts, setSelectedYearForTalentPosts] =
        useState(null);
    const [selectedYearForFounderPosts, setSelectedYearForFounderPosts] =
        useState(null);
    const [
        monthlyListingsDataForFounderPosts,
        setMonthlyListingsDataForFounderPosts,
    ] = useState([]);
    const [
        monthlyListingsDataForTalentPosts,
        setMonthlyListingsDataForTalentPosts,
    ] = useState([]);

    useEffect(() => {
        const fetchWorkBasisAndUserTypeDataForFounder = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-workbasis-and-usertype-data-for-founder"
                );
                const data = await res.json();
                if (res.ok && data.success) {
                    setWorkBasisBarChartDataForFounder({
                        labels: data.workBasis.map((item) => item.label),
                        datasets: [
                            {
                                label: "Work Basis",
                                data: data.workBasis.map((item) => item.value),
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                            },
                        ],
                    });

                    setUserTypeBarChartDataForFounder({
                        labels: data.userType.map((item) => item.label),
                        datasets: [
                            {
                                label: "User Type",
                                data: data.userType.map((item) => item.value),
                                backgroundColor: "rgba(255, 159, 64, 0.6)",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        const fetchWorkBasisAndUserTypeDataForGetDiscovered = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-workbasis-and-usertype-data-for-getDiscovered"
                );
                const data = await res.json();
                if (res.ok && data.success) {
                    setWorkBasisBarChartDataForGetDiscovered({
                        labels: data.workBasis.map((item) => item.label),
                        datasets: [
                            {
                                label: "Work Basis",
                                data: data.workBasis.map((item) => item.value),
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                            },
                        ],
                    });

                    setUserTypeBarChartDataForGetDiscovered({
                        labels: data.userType.map((item) => item.label),
                        datasets: [
                            {
                                label: "User Type",
                                data: data.userType.map((item) => item.value),
                                backgroundColor: "rgba(255, 159, 64, 0.6)",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchGenderPerRoleData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-gender-data-for-each-role"
                );
                const data = await res.json();
                if (res.ok && data.success) setGenderPerRoleData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchGenderPerRoleDataForPost = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-gender-data-for-each-role-for-post"
                );
                const data = await res.json();
                if (res.ok && data.success) setGenderPerRoleDataForPost(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchAgeData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-age-data"
                );
                const data = await res.json();
                if (res.ok && data.success) setAgeData(data.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchAgeDataForGetDiscovered = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-age-data-for-getDiscovered"
                );
                const data = await res.json();
                if (res.ok && data.success) setAgeDataForGetDiscovered(data.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchAgeDataForFounder = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-age-data-for-founder"
                );
                const data = await res.json();
                if (res.ok && data.success) setAgeDataForDiscoverTalent(data.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchMaleFemaleData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-male-female-number"
                );
                const data = await res.json();
                if (res.ok) {
                    setMaleFemalePieChartData({
                        male: data.totalMale,
                        female: data.totalFemale,
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchMaleFemaleDataForPosts = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-male-female-post-number"
                );
                const data = await res.json();
                if (res.ok) {
                    setMaleFemalePieChartDataForPost({
                        male: data.totalMalePosts,
                        female: data.totalFemalePosts,
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchRoleDistributionData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-role-data"
                );
                const data = await res.json();
                if (res.ok && data.success) {
                    setRoleBarChartData({
                        founders: data.noOfFounders,
                        getDiscovereds: data.noOfGetDiscovereds,
                        total: data.total,
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        const fetchRoleDistributionDataForPost = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3333/api/admin/analytics/get-role-data-for-post"
                );
                const data = await res.json();
                if (res.ok && data.success) {
                    setRoleBarChartDataForPost({
                        founders: data.noOfFounders,
                        getDiscovereds: data.noOfGetDiscovereds,
                        total: data.total,
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchWorkBasisAndUserTypeDataForFounder();
        fetchWorkBasisAndUserTypeDataForGetDiscovered();
        fetchGenderPerRoleData();
        fetchGenderPerRoleDataForPost();
        fetchAgeData();
        fetchAgeDataForGetDiscovered();
        fetchAgeDataForFounder();
        fetchMaleFemaleData();
        fetchMaleFemaleDataForPosts();
        fetchRoleDistributionData();
        fetchRoleDistributionDataForPost();

        // Fetch available years and default year listings
        fetchAvailableYearsAndDefaultListingsForFounderPosts();
        fetchAvailableYearsAndDefaultListingsForTalentPosts();
    }, []);

    const fetchAvailableYearsAndDefaultListingsForFounderPosts = async () => {
        try {
            const res = await fetch(
                "http://localhost:3333/api/admin/analytics/listings-by-founder-analytics-year-wise-with-months?year=2025"
            );
            const data = await res.json();
            if (res.ok && data.success) {
                setAvailableYearsForFounderPosts(data.availableYears);
                if (data.availableYears.length > 0) {
                    setSelectedYearForFounderPosts(data.availableYears[0]);
                    fetchMonthlyListingsForFounderPosts(data.availableYears[0]);
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchAvailableYearsAndDefaultListingsForTalentPosts = async () => {
        try {
            const res = await fetch(
                "http://localhost:3333/api/admin/analytics/listings-by-talent-analytics-year-wise-with-months?year=2025"
            );
            const data = await res.json();
            if (res.ok && data.success) {
                setAvailableYearsForTalentPosts(data.availableYears);
                if (data.availableYears.length > 0) {
                    setSelectedYearForTalentPosts(data.availableYears[0]);
                    fetchMonthlyListingsForTalentPosts(data.availableYears[0]);
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchMonthlyListingsForFounderPosts = async (year) => {
        try {
            const res = await fetch(
                `http://localhost:3333/api/admin/analytics/listings-by-founder-analytics-year-wise-with-months?year=${year}`
            );
            const data = await res.json();
            if (res.ok && data.success) {
                setMonthlyListingsDataForFounderPosts(data.data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchMonthlyListingsForTalentPosts = async (year) => {
        try {
            const res = await fetch(
                `http://localhost:3333/api/admin/analytics/listings-by-talent-analytics-year-wise-with-months?year=${year}`
            );
            const data = await res.json();
            if (res.ok && data.success) {
                setMonthlyListingsDataForTalentPosts(data.data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const handleYearChangeForFounderPosts = (e) => {
        const selected = parseInt(e.target.value);
        setSelectedYearForFounderPosts(selected);
        fetchMonthlyListingsForFounderPosts(selected);
    };

    const handleYearChangeForTalentPosts = (e) => {
        const selected = parseInt(e.target.value);
        setSelectedYearForTalentPosts(selected);
        fetchMonthlyListingsForTalentPosts(selected);
    };

    if (
        !genderPerRoleData ||
        !genderPerRoleDataForPost ||
        !ageData ||
        !ageDataForDiscoverTalent ||
        !ageDataForGetDiscovered ||
        !roleBarChartData ||
        !roleBarChartDataForPost ||
        !maleFemalePieChartData ||
        !maleFemalePieChartDataForPost
    ) {
        return <div className="loader m-auto"></div>;
    }

    const getDiscoveredPieData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "GetDiscovered Gender Split",
                data: [
                    genderPerRoleData.totalMaleUnderGetDiscovered,
                    genderPerRoleData.totalfemaleUnderGetDiscovered,
                ],
                backgroundColor: ["#3498db", "#e91e63"],
                borderColor: ["#2980b9", "#c2185b"],
                borderWidth: 1,
            },
        ],
    };

    const getDiscoveredPieDataForPost = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "GetDiscovered Gender Split",
                data: [
                    genderPerRoleDataForPost.totalMaleUnderGetDiscovered,
                    genderPerRoleDataForPost.totalfemaleUnderGetDiscovered,
                ],
                backgroundColor: ["#3498db", "#e91e63"],
                borderColor: ["#2980b9", "#c2185b"],
                borderWidth: 1,
            },
        ],
    };

    const founderPieData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Founder Gender Split",
                data: [
                    genderPerRoleData.totalMaleUnderFounder,
                    genderPerRoleData.totalFemaleUnderFounder,
                ],
                backgroundColor: ["#4caf50", "#ff9800"],
                borderColor: ["#388e3c", "#f57c00"],
                borderWidth: 1,
            },
        ],
    };

    const founderPieDataForPost = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Founder Gender Split",
                data: [
                    genderPerRoleDataForPost.totalMaleUnderFounder,
                    genderPerRoleDataForPost.totalFemaleUnderFounder,
                ],
                backgroundColor: ["#4caf50", "#ff9800"],
                borderColor: ["#388e3c", "#f57c00"],
                borderWidth: 1,
            },
        ],
    };

    const ageBarChartData = {
        labels: ageData.map((item) => item.range),
        datasets: [
            {
                label: "Male",
                data: ageData.map((item) => item.male),
                backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            {
                label: "Female",
                data: ageData.map((item) => item.female),
                backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
        ],
    };

    const ageBarChartDataForGetDiscovereds = {
        labels: ageDataForGetDiscovered.map((item) => item.range),
        datasets: [
            {
                label: "Male",
                data: ageDataForGetDiscovered.map((item) => item.male),
                backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            {
                label: "Female",
                data: ageDataForGetDiscovered.map((item) => item.female),
                backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
        ],
    };

    const ageBarChartDataForFounder = {
        labels: ageDataForDiscoverTalent.map((item) => item.range),
        datasets: [
            {
                label: "Male",
                data: ageDataForDiscoverTalent.map((item) => item.male),
                backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
            {
                label: "Female",
                data: ageDataForDiscoverTalent.map((item) => item.female),
                backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
        ],
    };

    const roleChartData = {
        labels: ["Founder", "GetDiscovered", "Total"],
        datasets: [
            {
                label: "Users by Role",
                data: [
                    roleBarChartData.founders,
                    roleBarChartData.getDiscovereds,
                    roleBarChartData.total,
                ],
                backgroundColor: ["#8e44ad", "#27ae60", "#f39c12"],
                borderColor: ["#71368a", "#1e8449", "#e67e22"],
                borderWidth: 1,
            },
        ],
    };

    const roleChartDataForPost = {
        labels: ["Founder", "GetDiscovered", "Total"],
        datasets: [
            {
                label: "Users by Role",
                data: [
                    roleBarChartDataForPost.founders,
                    roleBarChartDataForPost.getDiscovereds,
                    roleBarChartDataForPost.total,
                ],
                backgroundColor: ["#8e44ad", "#27ae60", "#f39c12"],
                borderColor: ["#71368a", "#1e8449", "#e67e22"],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Gender Distribution",
                data: [
                    maleFemalePieChartData.male,
                    maleFemalePieChartData.female,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const pieDataForPosts = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Gender Distribution",
                data: [
                    maleFemalePieChartDataForPost.male,
                    maleFemalePieChartDataForPost.female,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const listingsByFounderYearWiseBarChartData = {
        labels: monthlyListingsDataForFounderPosts.map((item) => item.month),
        datasets: [
            {
                label: `Listings for ${selectedYearForFounderPosts}`,
                data: monthlyListingsDataForFounderPosts.map(
                    (item) => item.count
                ),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const listingsByTalentYearWiseBarChartData = {
        labels: monthlyListingsDataForTalentPosts.map((item) => item.month),
        datasets: [
            {
                label: `Listings for ${selectedYearForTalentPosts}`,
                data: monthlyListingsDataForTalentPosts.map(
                    (item) => item.count
                ),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    const commonBarOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl p-6 backdrop-blur-lg bg-opacity-80 border border-gray-700 hover:scale-105 transform transition duration-300">
                    <h4 className="text-base text-gray-300 mb-2 uppercase tracking-wide">
                        Total Users
                    </h4>
                    <p className="text-4xl font-extrabold">
                        {roleBarChartData.total}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-950 text-white rounded-2xl shadow-2xl p-6 backdrop-blur-lg bg-opacity-80 border border-gray-700 hover:scale-105 transform transition duration-300">
                    <h4 className="text-base text-gray-300 mb-2 uppercase tracking-wide">
                        GetDiscovereds
                    </h4>
                    <p className="text-4xl font-extrabold">
                        {roleBarChartData.getDiscovereds}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl p-6 backdrop-blur-lg bg-opacity-80 border border-gray-700 hover:scale-105 transform transition duration-300">
                    <h4 className="text-base text-gray-300 mb-2 uppercase tracking-wide">
                        Founders
                    </h4>
                    <p className="text-4xl font-extrabold">
                        {roleBarChartData.founders}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 w-full h-fit rounded-md p-1 gap-3">
                <h2 className="col-span-3 text-2xl font-bold text-gray-800">
                    Signed up Analytics
                </h2>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <p className="w-full">Gender Statistics</p>
                    <Pie
                        data={pieData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: "bottom" } },
                        }}
                    />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <p className="w-full">Age Statistics</p>
                    <Bar data={ageBarChartData} options={commonBarOptions} />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex items-center justify-center">
                    <Bar data={roleChartData} options={commonBarOptions} />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold mb-2">
                        GetDiscovered Gender Split
                    </h2>
                    <Pie data={getDiscoveredPieData} />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold mb-2">
                        Founder Gender Split
                    </h2>
                    <Pie data={founderPieData} />
                </div>
            </div>
            <div className="grid grid-cols-3 w-full h-fit rounded-md p-1 gap-3">
                <h2 className="col-span-3 text-2xl font-bold text-gray-800">
                    Posts Analytics
                </h2>


                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <p className="w-full">Age Statistics For Get Discovered</p>
                    <Bar
                        data={ageBarChartDataForGetDiscovereds}
                        options={commonBarOptions}
                    />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <p className="w-full">Age Statistics For Discover Talent</p>
                    <Bar
                        data={ageBarChartDataForFounder}
                        options={commonBarOptions}
                    />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex items-center justify-center">
                    <Bar
                        data={roleChartDataForPost}
                        options={commonBarOptions}
                    />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold mb-2">
                        GetDiscovered Gender Split
                    </h2>
                    <Pie data={getDiscoveredPieDataForPost} />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold mb-2">
                        Founder Gender Split
                    </h2>
                    <Pie data={founderPieDataForPost} />
                </div>
                <br />
                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-2">
                        Work Basis Distribution For Founder
                    </h3>
                    <Bar
                        data={workBasisBarChartDataForFounder}
                        options={commonBarOptions}
                    />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-2">
                        User Type Distribution For Founder
                    </h3>
                    <Bar
                        data={userTypeBarChartDataForFounder}
                        options={commonBarOptions}
                    />
                </div>
                <br />
                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-2">
                        Work Basis Distribution For GetDiscovered
                    </h3>
                    <Bar
                        data={workBasisBarChartDataForGetDiscovered}
                        options={commonBarOptions}
                    />
                </div>

                <div className="bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-2">
                        User Type Distribution For GetDiscovered
                    </h3>
                    <Bar
                        data={userTypeBarChartDataForGetDiscovered}
                        options={commonBarOptions}
                    />
                </div>

                <div className="col-span-3 bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">
                            Number of Posts Per Month By "DiscoverTalent" (
                            {selectedYearForFounderPosts})
                        </h3>
                        <select
                            value={selectedYearForFounderPosts || ""}
                            onChange={handleYearChangeForFounderPosts}
                            className="border rounded-md px-2 py-1"
                        >
                            {availableYearsForFounderPosts.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Bar
                        data={listingsByFounderYearWiseBarChartData}
                        options={commonBarOptions}
                    />
                </div>

                <div className="col-span-3 bg-[#FEFEFE] rounded-md shadow-md p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">
                            Number of Posts Per Month By "GetDiscovered" (
                            {selectedYearForTalentPosts})
                        </h3>
                        <select
                            value={selectedYearForTalentPosts || ""}
                            onChange={handleYearChangeForTalentPosts}
                            className="border rounded-md px-2 py-1"
                        >
                            {availableYearsForTalentPosts.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Bar
                        data={listingsByTalentYearWiseBarChartData}
                        options={commonBarOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
