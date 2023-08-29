import React from 'react';
import jsonData from './fakePatientData.json'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// a giant array of all the recorded key names for each state
var attributes:string[] = ['Rate Your Experience (1-10)', 'Issues Resolved', 'Time to Completion (hrs)', 'state', 'date', 'critical_staffing_shortage_today_yes', 'critical_staffing_shortage_today_no', 'critical_staffing_shortage_today_not_reported', 
'critical_staffing_shortage_anticipated_within_week_yes', 'critical_staffing_shortage_anticipated_within_week_no', 'critical_staffing_shortage_anticipated_within_week_not_reported', 
'hospital_onset_covid', 'hospital_onset_covid_coverage', 'inpatient_beds', 'inpatient_beds_coverage', 'inpatient_beds_used', 'inpatient_beds_used_coverage', 
'inpatient_beds_used_covid', 'inpatient_beds_used_covid_coverage', 'previous_day_admission_adult_covid_confirmed', 'previous_day_admission_adult_covid_confirmed_coverage', 
'previous_day_admission_adult_covid_suspected', 'previous_day_admission_adult_covid_suspected_coverage', 'previous_day_admission_pediatric_covid_confirmed', 
'previous_day_admission_pediatric_covid_confirmed_coverage', 'previous_day_admission_pediatric_covid_suspected', 'previous_day_admission_pediatric_covid_suspected_coverage', 
'staffed_adult_icu_bed_occupancy', 'staffed_adult_icu_bed_occupancy_coverage', 'staffed_icu_adult_patients_confirmed_and_suspected_covid', 
'staffed_icu_adult_patients_confirmed_and_suspected_covid_coverage', 'staffed_icu_adult_patients_confirmed_covid', 'staffed_icu_adult_patients_confirmed_covid_coverage', 
'total_adult_patients_hospitalized_confirmed_and_suspected_covid', 'total_adult_patients_hospitalized_confirmed_and_suspected_covid_coverage', 
'total_adult_patients_hospitalized_confirmed_covid', 'total_adult_patients_hospitalized_confirmed_covid_coverage', 'total_pediatric_patients_hospitalized_confirmed_and_suspected_covid', 
'total_pediatric_patients_hospitalized_confirmed_and_suspected_covid_coverage', 'total_pediatric_patients_hospitalized_confirmed_covid', 
'total_pediatric_patients_hospitalized_confirmed_covid_coverage', 'total_staffed_adult_icu_beds', 'total_staffed_adult_icu_beds_coverage', 'inpatient_beds_utilization', 
'inpatient_beds_utilization_coverage', 'inpatient_beds_utilization_numerator', 'inpatient_beds_utilization_denominator', 'percent_of_inpatients_with_covid', 
'percent_of_inpatients_with_covid_coverage', 'percent_of_inpatients_with_covid_numerator', 'percent_of_inpatients_with_covid_denominator', 'inpatient_bed_covid_utilization', 
'inpatient_bed_covid_utilization_coverage', 'inpatient_bed_covid_utilization_numerator', 'inpatient_bed_covid_utilization_denominator', 'adult_icu_bed_covid_utilization', 
'adult_icu_bed_covid_utilization_coverage', 'adult_icu_bed_covid_utilization_numerator', 'adult_icu_bed_covid_utilization_denominator', 'adult_icu_bed_utilization', 
'adult_icu_bed_utilization_coverage', 'adult_icu_bed_utilization_numerator', 'adult_icu_bed_utilization_denominator', 'geocoded_state', 
'previous_day_admission_adult_covid_confirmed_18-19', 'previous_day_admission_adult_covid_confirmed_18-19_coverage', 'previous_day_admission_adult_covid_confirmed_20-29', 
'previous_day_admission_adult_covid_confirmed_20-29_coverage', 'previous_day_admission_adult_covid_confirmed_30-39', 'previous_day_admission_adult_covid_confirmed_30-39_coverage', 
'previous_day_admission_adult_covid_confirmed_40-49', 'previous_day_admission_adult_covid_confirmed_40-49_coverage', 'previous_day_admission_adult_covid_confirmed_50-59', 
'previous_day_admission_adult_covid_confirmed_50-59_coverage', 'previous_day_admission_adult_covid_confirmed_60-69', 'previous_day_admission_adult_covid_confirmed_60-69_coverage', 
'previous_day_admission_adult_covid_confirmed_70-79', 'previous_day_admission_adult_covid_confirmed_70-79_coverage', 'previous_day_admission_adult_covid_confirmed_80+', 
'previous_day_admission_adult_covid_confirmed_80+_coverage', 'previous_day_admission_adult_covid_confirmed_unknown', 'previous_day_admission_adult_covid_confirmed_unknown_coverage', 
'previous_day_admission_adult_covid_suspected_18-19', 'previous_day_admission_adult_covid_suspected_18-19_coverage', 'previous_day_admission_adult_covid_suspected_20-29', 
'previous_day_admission_adult_covid_suspected_20-29_coverage', 'previous_day_admission_adult_covid_suspected_30-39', 'previous_day_admission_adult_covid_suspected_30-39_coverage', 
'previous_day_admission_adult_covid_suspected_40-49', 'previous_day_admission_adult_covid_suspected_40-49_coverage', 'previous_day_admission_adult_covid_suspected_50-59', 
'previous_day_admission_adult_covid_suspected_50-59_coverage', 'previous_day_admission_adult_covid_suspected_60-69', 'previous_day_admission_adult_covid_suspected_60-69_coverage', 
'previous_day_admission_adult_covid_suspected_70-79', 'previous_day_admission_adult_covid_suspected_70-79_coverage', 'previous_day_admission_adult_covid_suspected_80+', 
'previous_day_admission_adult_covid_suspected_80+_coverage', 'previous_day_admission_adult_covid_suspected_unknown', 'previous_day_admission_adult_covid_suspected_unknown_coverage', 
'deaths_covid', 'deaths_covid_coverage', 'on_hand_supply_therapeutic_a_casirivimab_imdevimab_courses', 'on_hand_supply_therapeutic_b_bamlanivimab_courses', 
'on_hand_supply_therapeutic_c_bamlanivimab_etesevimab_courses', 'previous_week_therapeutic_a_casirivimab_imdevimab_courses_used', 'previous_week_therapeutic_b_bamlanivimab_courses_used', 
'previous_week_therapeutic_c_bamlanivimab_etesevimab_courses_used', 'icu_patients_confirmed_influenza', 'icu_patients_confirmed_influenza_coverage', 
'previous_day_admission_influenza_confirmed', 'previous_day_admission_influenza_confirmed_coverage', 'previous_day_deaths_covid_and_influenza', 
'previous_day_deaths_covid_and_influenza_coverage', 'previous_day_deaths_influenza', 'previous_day_deaths_influenza_coverage', 'total_patients_hospitalized_confirmed_influenza', 
'total_patients_hospitalized_confirmed_influenza_and_covid', 'total_patients_hospitalized_confirmed_influenza_and_covid_coverage', 
'total_patients_hospitalized_confirmed_influenza_coverage', 'all_pediatric_inpatient_bed_occupied', 'all_pediatric_inpatient_bed_occupied_coverage', 'all_pediatric_inpatient_beds', 
'all_pediatric_inpatient_beds_coverage', 'previous_day_admission_pediatric_covid_confirmed_0_4', 'previous_day_admission_pediatric_covid_confirmed_0_4_coverage', 
'previous_day_admission_pediatric_covid_confirmed_12_17', 'previous_day_admission_pediatric_covid_confirmed_12_17_coverage', 'previous_day_admission_pediatric_covid_confirmed_5_11', 
'previous_day_admission_pediatric_covid_confirmed_5_11_coverage', 'previous_day_admission_pediatric_covid_confirmed_unknown', 
'previous_day_admission_pediatric_covid_confirmed_unknown_coverage', 'staffed_icu_pediatric_patients_confirmed_covid', 'staffed_icu_pediatric_patients_confirmed_covid_coverage', 
'staffed_pediatric_icu_bed_occupancy', 'staffed_pediatric_icu_bed_occupancy_coverage', 'total_staffed_pediatric_icu_beds', 'total_staffed_pediatric_icu_beds_coverage']

// sets the index of the key that will be displayed
const attributeNum = 24;

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Covid Data by State',
        },
    },
};

function formatData(attrNum:number) {
    var dataArray: number[] = [];
    Object.entries(jsonData).forEach(state => {
        dataArray.push((state[1] as any)[attributes[attrNum]])
    })
    console.log(dataArray);
    return dataArray;
}

function labels() {
    var labels: string[] = [];
    // iterate over jsonData props and push to labels array
    for (var prop in jsonData) {
        if (Object.prototype.hasOwnProperty.call(jsonData, prop)) {
            labels.push(prop)
        }
    }
    return labels;
}

export const data = {
    labels: labels(),
    datasets: [
        {
            label: attributes[attributeNum],
            data: formatData(attributeNum),
            backgroundColor: 'rgba(0, 119, 187, 1)',
        },
        {
            label: attributes[attributeNum + 1],
            data: formatData(attributeNum + 1),
            backgroundColor: 'rgba(51, 187, 238, 1)',
        },
        {
            label: attributes[attributeNum + 2],
            data: formatData(attributeNum + 2),
            backgroundColor: 'rgba(0, 153, 136, 1)',
        },
    ],
};

export const ChartComponent: React.FC = () => {
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
};