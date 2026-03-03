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
        date: 'Feb 22, 2025'
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
        date: 'Feb 10, 2025'
    },
    {
        id: 3,
        rptNumber: 'RPT-2025-00098',
        ownerName: 'Aquino, Ramon D.',
        location: 'Dolores I, San Pablo',
        engineer: 'Engr. Maria Garcia',
        propertyType: 'Agricultural',
        status: 'for-review',
        date: 'Feb 16, 2025'
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
        date: 'Feb 12, 2025'
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
        date: 'Feb 08, 2025'
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
        date: 'Jan 20, 2025'
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
        date: 'Jan 28, 2025'
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
        date: 'Jan 10, 2025',
        toNumber: 'TO-2025-GEN-00012'
    },
    {
        id: 9,
        rptNumber: 'RPT-2025-00162',
        ownerName: 'Chua, Wellington D.',
        location: 'Bagumbayan, San Pablo',
        engineer: 'Engr. Roberto Cruz',
        propertyType: 'Commercial',
        status: 'completed',
        date: 'Jan 05, 2025',
        toNumber: 'TO-2025-GEN-00038'
    }
]
