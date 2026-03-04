// /server/utils/propertyAssessments.ts

import type { PropertyAssessment } from '~/types/model'

export const propertyAssessments: PropertyAssessment[] = [
    // Draft
    {
        id: 1,
        rptNumber: 'RPT-2025-00198',
        ownerName: 'Perez, Francisco G.',
        location: 'Poblacion, San Pablo',
        engineer: 'Engr. Roberto Cruz',
        propertyType: 'Residential',
        status: 'draft',
        aging: 3,
        date: 'Feb 22, 2025',
        ownerInfo: {
            fullName: 'Francisco G. Perez',
            contactNumber: '0917-123-4567',
            email: 'francisco.perez@email.com',
            address: '23 Rizal Street, Poblacion, San Pablo City',
            tin: '123-456-789-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 12',
            blockNumber: 'Block 4',
            surveyNumber: 'SSD-09-001234',
            titleNumber: 'TCT-T-123456',
            landArea: 250,
            landAreaUnit: 'sqm',
            barangay: 'Poblacion',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Residential'
        },
        appraisal: {
            marketValue: 1250000,
            assessedValue: 875000,
            assessmentLevel: 20,
            taxableValue: 875000,
            annualTax: 8750,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Roberto Cruz',
            inspectionDate: 'Feb 22, 2025',
            findings: 'Single-storey residential structure in good condition. Land area confirmed.',
            recommendation: 'Proceed with assessment as per submitted documents.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Pending', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Pending', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Missing', icon: 'i-lucide-map' }
        ],
        timeline: [
            { date: 'Feb 22, 2025', event: 'Application submitted', actor: 'Francisco Perez', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Feb 22, 2025', event: 'Saved as draft', actor: 'Engr. Roberto Cruz', icon: 'i-lucide-save', color: 'text-neutral-400' }
        ]
    },
    // For Review
    {
        id: 2,
        rptNumber: 'RPT-2025-00240',
        ownerName: 'Hallari, Emmanuel B.',
        location: 'Bagumbayan, San Pablo',
        engineer: 'Engr. Roberto Cruz',
        propertyType: 'Residential',
        status: 'for-review',
        aging: 2,
        date: 'Feb 10, 2025',
        ownerInfo: {
            fullName: 'Emmanuel B. Hallari',
            contactNumber: '0918-222-3333',
            email: 'emmanuel.hallari@email.com',
            address: '45 Mabini Street, Bagumbayan, San Pablo City',
            tin: '234-567-890-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 7',
            blockNumber: 'Block 2',
            surveyNumber: 'SSD-09-002345',
            titleNumber: 'TCT-T-234567',
            landArea: 320,
            landAreaUnit: 'sqm',
            barangay: 'Bagumbayan',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Residential'
        },
        appraisal: {
            marketValue: 1600000,
            assessedValue: 1120000,
            assessmentLevel: 20,
            taxableValue: 1120000,
            annualTax: 11200,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Roberto Cruz',
            inspectionDate: 'Feb 12, 2025',
            findings: 'Two-storey residential structure, recently renovated. Land area matches survey.',
            recommendation: 'Forward for review with complete documents.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Pending', icon: 'i-lucide-map' }
        ],
        timeline: [
            { date: 'Feb 10, 2025', event: 'Application submitted', actor: 'Emmanuel Hallari', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Feb 11, 2025', event: 'Inspection conducted', actor: 'Engr. Roberto Cruz', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Feb 12, 2025', event: 'Forwarded for review', actor: 'Engr. Roberto Cruz', icon: 'i-lucide-send', color: 'text-yellow-500' }
        ]
    },
    {
        id: 3,
        rptNumber: 'RPT-2025-00098',
        ownerName: 'Aquino, Ramon D.',
        location: 'Dolores I, San Pablo',
        engineer: 'Engr. Maria Garcia',
        propertyType: 'Agricultural',
        status: 'for-review',
        aging: 6,
        date: 'Feb 16, 2025',
        ownerInfo: {
            fullName: 'Ramon D. Aquino',
            contactNumber: '0919-333-4444',
            email: 'ramon.aquino@email.com',
            address: 'Brgy. Dolores I, San Pablo City, Laguna',
            tin: '345-678-901-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 3',
            blockNumber: '-',
            surveyNumber: 'SSD-09-003456',
            titleNumber: 'TCT-T-345678',
            landArea: 5200,
            landAreaUnit: 'sqm',
            barangay: 'Dolores I',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Agricultural'
        },
        appraisal: {
            marketValue: 2600000,
            assessedValue: 1040000,
            assessmentLevel: 40,
            taxableValue: 1040000,
            annualTax: 10400,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Maria Garcia',
            inspectionDate: 'Feb 18, 2025',
            findings: 'Coconut plantation, approximately 5,200 sqm. Adjacent to irrigation canal.',
            recommendation: 'Agricultural classification confirmed. Proceed with review.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Maria Garcia', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Pending', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Verified', verifiedBy: 'Maria Garcia', icon: 'i-lucide-map' }
        ],
        timeline: [
            { date: 'Feb 16, 2025', event: 'Application submitted', actor: 'Ramon Aquino', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Feb 18, 2025', event: 'Inspection conducted', actor: 'Engr. Maria Garcia', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Feb 20, 2025', event: 'Forwarded for review', actor: 'Engr. Maria Garcia', icon: 'i-lucide-send', color: 'text-yellow-500' }
        ]
    },
    // Dept. Clearance
    {
        id: 4,
        rptNumber: 'RPT-2025-00255',
        ownerName: 'Garcia, Jose Antonio M.',
        location: 'Mahim, San Pablo',
        engineer: 'Engr. Patricia Santos',
        propertyType: 'Commercial',
        status: 'dept-clearance',
        aging: 8,
        date: 'Feb 12, 2025',
        ownerInfo: {
            fullName: 'Jose Antonio M. Garcia',
            contactNumber: '0920-444-5555',
            email: 'joseantonio.garcia@email.com',
            address: '12 Commercial Ave., Mahim, San Pablo City',
            tin: '456-789-012-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 18',
            blockNumber: 'Block 1',
            surveyNumber: 'SSD-09-004567',
            titleNumber: 'TCT-T-456789',
            landArea: 800,
            landAreaUnit: 'sqm',
            barangay: 'Mahim',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Commercial'
        },
        appraisal: {
            marketValue: 8000000,
            assessedValue: 6000000,
            assessmentLevel: 50,
            taxableValue: 6000000,
            annualTax: 60000,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Patricia Santos',
            inspectionDate: 'Feb 14, 2025',
            findings: 'Three-storey commercial building. Business premises in active commercial use.',
            recommendation: 'Commercial classification confirmed. Awaiting department clearances.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-map' },
            { title: 'Building Permit', status: 'Pending', icon: 'i-lucide-building-2' }
        ],
        timeline: [
            { date: 'Feb 12, 2025', event: 'Application submitted', actor: 'Jose Garcia', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Feb 14, 2025', event: 'Inspection conducted', actor: 'Engr. Patricia Santos', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Feb 15, 2025', event: 'Review approved', actor: 'Assessor Office', icon: 'i-lucide-circle-check', color: 'text-green-500' },
            { date: 'Feb 16, 2025', event: 'Sent for dept. clearance', actor: 'Assessor Office', icon: 'i-lucide-send', color: 'text-purple-500' }
        ]
    },
    // Inspection
    {
        id: 5,
        rptNumber: 'RPT-2025-00221',
        ownerName: 'Santos, Teresa A.',
        location: 'San Miguel, San Pablo',
        engineer: 'Engr. Patricia Santos',
        propertyType: 'Residential',
        status: 'inspection',
        aging: 5,
        date: 'Feb 08, 2025',
        ownerInfo: {
            fullName: 'Teresa A. Santos',
            contactNumber: '0921-555-6666',
            email: 'teresa.santos@email.com',
            address: '56 San Miguel Street, San Pablo City',
            tin: '567-890-123-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 22',
            blockNumber: 'Block 6',
            surveyNumber: 'SSD-09-005678',
            titleNumber: 'TCT-T-567890',
            landArea: 180,
            landAreaUnit: 'sqm',
            barangay: 'San Miguel',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Residential'
        },
        appraisal: {
            marketValue: 900000,
            assessedValue: 630000,
            assessmentLevel: 20,
            taxableValue: 630000,
            annualTax: 6300,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Patricia Santos',
            inspectionDate: 'Feb 10, 2025',
            findings: 'Ongoing inspection. Residential bungalow, concrete structure.',
            recommendation: 'Pending completion of inspection report.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Pending', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Pending', icon: 'i-lucide-map' }
        ],
        timeline: [
            { date: 'Feb 08, 2025', event: 'Application submitted', actor: 'Teresa Santos', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Feb 09, 2025', event: 'Assigned to engineer', actor: 'Assessor Office', icon: 'i-lucide-user-check', color: 'text-blue-400' },
            { date: 'Feb 10, 2025', event: 'Inspection in progress', actor: 'Engr. Patricia Santos', icon: 'i-lucide-search', color: 'text-blue-500' }
        ]
    },
    // Evaluation
    {
        id: 6,
        rptNumber: 'RPT-2025-00178',
        ownerName: 'Reyes, Maria Clara S.',
        location: 'Sta. Rosa, San Pablo',
        engineer: 'Engr. Maria Garcia',
        propertyType: 'Agricultural',
        status: 'evaluation',
        aging: 12,
        date: 'Jan 20, 2025',
        ownerInfo: {
            fullName: 'Maria Clara S. Reyes',
            contactNumber: '0922-666-7777',
            email: 'mariaclara.reyes@email.com',
            address: 'Brgy. Sta. Rosa, San Pablo City, Laguna',
            tin: '678-901-234-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 5',
            blockNumber: '-',
            surveyNumber: 'SSD-09-006789',
            titleNumber: 'TCT-T-678901',
            landArea: 10500,
            landAreaUnit: 'sqm',
            barangay: 'Sta. Rosa',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Agricultural'
        },
        appraisal: {
            marketValue: 5250000,
            assessedValue: 2100000,
            assessmentLevel: 40,
            taxableValue: 2100000,
            annualTax: 21000,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Maria Garcia',
            inspectionDate: 'Jan 25, 2025',
            findings: 'Mixed cropland. Rice paddy covering approximately 60% of lot area. Good soil condition.',
            recommendation: 'Proceed to evaluation for market value computation.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Maria Garcia', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Verified', verifiedBy: 'Maria Garcia', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Verified', verifiedBy: 'Maria Garcia', icon: 'i-lucide-map' },
            { title: 'Soil Report', status: 'Pending', icon: 'i-lucide-layers' }
        ],
        timeline: [
            { date: 'Jan 20, 2025', event: 'Application submitted', actor: 'Maria Clara Reyes', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Jan 25, 2025', event: 'Inspection conducted', actor: 'Engr. Maria Garcia', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Jan 28, 2025', event: 'Review approved', actor: 'Assessor Office', icon: 'i-lucide-circle-check', color: 'text-green-500' },
            { date: 'Feb 02, 2025', event: 'Dept. clearances obtained', actor: 'Various Departments', icon: 'i-lucide-badge-check', color: 'text-purple-500' },
            { date: 'Feb 05, 2025', event: 'Sent for evaluation', actor: 'Assessor Office', icon: 'i-lucide-calculator', color: 'text-pink-500' }
        ]
    },
    // Assessment
    {
        id: 7,
        rptNumber: 'RPT-2025-00203',
        ownerName: 'Tan, Michael L.',
        location: 'Poblacion, San Pablo',
        engineer: 'Engr. Roberto Cruz',
        propertyType: 'Commercial',
        status: 'assessment',
        aging: 18,
        date: 'Jan 28, 2025',
        ownerInfo: {
            fullName: 'Michael L. Tan',
            contactNumber: '0923-777-8888',
            email: 'michael.tan@email.com',
            address: '88 Poblacion Commercial District, San Pablo City',
            tin: '789-012-345-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 30',
            blockNumber: 'Block 8',
            surveyNumber: 'SSD-09-007890',
            titleNumber: 'TCT-T-789012',
            landArea: 1200,
            landAreaUnit: 'sqm',
            barangay: 'Poblacion',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Commercial'
        },
        appraisal: {
            marketValue: 12000000,
            assessedValue: 9000000,
            assessmentLevel: 50,
            taxableValue: 9000000,
            annualTax: 90000,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Roberto Cruz',
            inspectionDate: 'Feb 02, 2025',
            findings: 'Four-storey commercial building. Mall-type structure. Fully occupied.',
            recommendation: 'Final assessment computation in progress.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-map' },
            { title: 'Building Permit', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-building-2' }
        ],
        timeline: [
            { date: 'Jan 28, 2025', event: 'Application submitted', actor: 'Michael Tan', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Feb 02, 2025', event: 'Inspection conducted', actor: 'Engr. Roberto Cruz', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Feb 05, 2025', event: 'Review approved', actor: 'Assessor Office', icon: 'i-lucide-circle-check', color: 'text-green-500' },
            { date: 'Feb 08, 2025', event: 'Dept. clearances obtained', actor: 'Various Departments', icon: 'i-lucide-badge-check', color: 'text-purple-500' },
            { date: 'Feb 10, 2025', event: 'Evaluation completed', actor: 'Assessor Office', icon: 'i-lucide-calculator', color: 'text-pink-500' },
            { date: 'Feb 12, 2025', event: 'Final assessment in progress', actor: 'Engr. Roberto Cruz', icon: 'i-lucide-file-pen', color: 'text-orange-500' }
        ]
    },
    // Completed
    {
        id: 8,
        rptNumber: 'RPT-2025-00146',
        ownerName: 'Dela Vega, Alexander C.',
        location: 'San Jose, San Pablo',
        engineer: 'Engr. Patricia Santos',
        propertyType: 'Residential',
        status: 'completed',
        aging: 25,
        date: 'Jan 10, 2025',
        toNumber: 'TO-2025-GEN-00012',
        ownerInfo: {
            fullName: 'Alexander C. Dela Vega',
            contactNumber: '0924-888-9999',
            email: 'alexander.delavega@email.com',
            address: '15 San Jose Avenue, San Pablo City, Laguna',
            tin: '890-123-456-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 9',
            blockNumber: 'Block 3',
            surveyNumber: 'SSD-09-008901',
            titleNumber: 'TCT-T-890123',
            landArea: 300,
            landAreaUnit: 'sqm',
            barangay: 'San Jose',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Residential'
        },
        appraisal: {
            marketValue: 1500000,
            assessedValue: 1050000,
            assessmentLevel: 20,
            taxableValue: 1050000,
            annualTax: 10500,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Patricia Santos',
            inspectionDate: 'Jan 14, 2025',
            findings: 'Residential house and lot in excellent condition. Two-storey concrete structure.',
            recommendation: 'Assessment completed. Tax Order of Payment issued.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-map' },
            { title: 'Tax Order of Payment', status: 'Verified', verifiedBy: 'Patricia Santos', icon: 'i-lucide-receipt' }
        ],
        timeline: [
            { date: 'Jan 10, 2025', event: 'Application submitted', actor: 'Alexander Dela Vega', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Jan 14, 2025', event: 'Inspection conducted', actor: 'Engr. Patricia Santos', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Jan 17, 2025', event: 'Review approved', actor: 'Assessor Office', icon: 'i-lucide-circle-check', color: 'text-green-500' },
            { date: 'Jan 20, 2025', event: 'Dept. clearances obtained', actor: 'Various Departments', icon: 'i-lucide-badge-check', color: 'text-purple-500' },
            { date: 'Jan 24, 2025', event: 'Evaluation completed', actor: 'Assessor Office', icon: 'i-lucide-calculator', color: 'text-pink-500' },
            { date: 'Jan 28, 2025', event: 'Final assessment approved', actor: 'City Assessor', icon: 'i-lucide-stamp', color: 'text-orange-500' },
            { date: 'Feb 03, 2025', event: 'Tax Order of Payment issued', actor: 'City Assessor', icon: 'i-lucide-receipt', color: 'text-green-500' }
        ]
    },
    {
        id: 9,
        rptNumber: 'RPT-2025-00162',
        ownerName: 'Chua, Wellington D.',
        location: 'Bagumbayan, San Pablo',
        engineer: 'Engr. Roberto Cruz',
        propertyType: 'Commercial',
        status: 'completed',
        aging: 30,
        date: 'Jan 05, 2025',
        toNumber: 'TO-2025-GEN-00038',
        ownerInfo: {
            fullName: 'Wellington D. Chua',
            contactNumber: '0925-999-0000',
            email: 'wellington.chua@email.com',
            address: '100 Bagumbayan Commercial St., San Pablo City',
            tin: '901-234-567-000'
        },
        propertyDetails: {
            lotNumber: 'Lot 14',
            blockNumber: 'Block 5',
            surveyNumber: 'SSD-09-009012',
            titleNumber: 'TCT-T-901234',
            landArea: 650,
            landAreaUnit: 'sqm',
            barangay: 'Bagumbayan',
            municipality: 'San Pablo City',
            province: 'Laguna',
            classification: 'Commercial'
        },
        appraisal: {
            marketValue: 6500000,
            assessedValue: 4875000,
            assessmentLevel: 50,
            taxableValue: 4875000,
            annualTax: 48750,
            effectivityYear: 2025
        },
        inspection: {
            inspectedBy: 'Engr. Roberto Cruz',
            inspectionDate: 'Jan 09, 2025',
            findings: 'Two-storey commercial warehouse. Good structural integrity. Currently in commercial use.',
            recommendation: 'Completed. Tax Order of Payment issued.'
        },
        documents: [
            { title: 'Tax Declaration', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-file-text' },
            { title: 'Transfer Certificate of Title', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-scroll' },
            { title: 'Sketch Plan', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-map' },
            { title: 'Tax Order of Payment', status: 'Verified', verifiedBy: 'Roberto Cruz', icon: 'i-lucide-receipt' }
        ],
        timeline: [
            { date: 'Jan 05, 2025', event: 'Application submitted', actor: 'Wellington Chua', icon: 'i-lucide-file-plus', color: 'text-primary-500' },
            { date: 'Jan 09, 2025', event: 'Inspection conducted', actor: 'Engr. Roberto Cruz', icon: 'i-lucide-search', color: 'text-blue-500' },
            { date: 'Jan 12, 2025', event: 'Review approved', actor: 'Assessor Office', icon: 'i-lucide-circle-check', color: 'text-green-500' },
            { date: 'Jan 16, 2025', event: 'Dept. clearances obtained', actor: 'Various Departments', icon: 'i-lucide-badge-check', color: 'text-purple-500' },
            { date: 'Jan 20, 2025', event: 'Evaluation completed', actor: 'Assessor Office', icon: 'i-lucide-calculator', color: 'text-pink-500' },
            { date: 'Jan 25, 2025', event: 'Final assessment approved', actor: 'City Assessor', icon: 'i-lucide-stamp', color: 'text-orange-500' },
            { date: 'Jan 30, 2025', event: 'Tax Order of Payment issued', actor: 'City Assessor', icon: 'i-lucide-receipt', color: 'text-green-500' }
        ]
    }
]
