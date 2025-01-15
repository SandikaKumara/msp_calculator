export const packages = [
    {
        name: 'Standard',
        minCount: 20,
        minRequirements: [],
        inputs: [
            {
                name: 'Endpoints',
                slug: 'endpoints',
                // minRequired: 20,
                // sellingPrice: 15,
                // costPrice: 8.25,
                // sameCount: false
            },
            {
                name: 'Users',
                slug: 'users',
                // minRequired: 0,
                // sellingPrice: 10,
                // costPrice: 5.77,
                // sameCount: false
            }
        ],
        features: [
            {
                name: 'Essential Features',
                list: [
                    {
                        name: 'Real-Time Monitoring and Alerts for All Endpoints'
                    },
                    {
                        name: 'Remote Access and Control from Anywhere'
                    },
                    {
                        name: 'Endpoint Backup and Restore (5TB pooled)'
                    },
                    {
                        name: 'Automated Patch Management and Remediation'
                    },
                    {
                        name: 'Unlimited support for platform related features'
                    },
                    {
                        name: 'Monthly Reporting'
                    }
                ]
            },
            {
                name: 'Endpoint Protection',
                list: [
                    {
                        name: 'Anti-Virus'
                    },
                    {
                        name: 'Managed Detection & Response'
                    },
                    {
                        name: '24/7 SOC'
                    },
                    {
                        name: 'Ransomware Detection'
                    }
                ]
            },
            {
                name: 'Cloud Security',
                list: [
                    {
                        name: 'Security Awareness Training'
                    },
                    {
                        name: 'Anti-Phishing'
                    },
                    {
                        name: 'Automated & Continuous SaaS Data Backup (Office 365 or Google)'
                    },
                    {
                        name: 'Instant, User-Specific Data Recovery'
                    },
                    {
                        name: 'Simulation & Testing'
                    },
                    {
                        name: 'Dark Web Monitoring'
                    },
                    {
                        name: 'Cloud Detection & Response'
                    }
                ]
            }

        ],
        sellingPrice: 25,
        costPrice: 14.02,
        cost: [
            {
                name: 'Kaseya 365 Endpoint Pro',
                slug: 'endpoints',
                cost: 8.25,
                price: 15,
                requiredMin: 20
            },
            {
                name: 'Kaseya User',
                slug: 'users',
                cost: 5.77,
                price: 10,
                requiredMin: 0
            }

        ],
        vendors: [
            {
                name: 'Kaseya 365 / user'
            }
        ]

    },
    {
        name: 'Premium',
        minCount: 20,
        minRequirements: [
            { name: 'Minimum contract period - 12 Months.' },
            { name: 'M365 premium license required.' }
        ],
        inputs: [
            {
                name: 'Current Microsoft Premium Users',
                slug: 'endpoints',
                // minRequired: 20,
                // sellingPrice: 42,
                // costPrice: 16.95,
                // sameCount: true
            },
        ],
        features: [
            {
                name: 'Essential Features',
                list: [
                    {
                        name: 'Endpoint Management'
                    },
                    {
                        name: 'Software Management'
                    },
                    {
                        name: 'Inventory of devices'
                    },
                    {
                        name: 'Automated Patch Management and Remediation'
                    },
                    {
                        name: 'Monthly Reporting'
                    },
                    {
                        name: 'Unlimited Support for platform related features'
                    },
                    {
                        name: 'Unlimited Office 365 backup for Teams, Exchange, Sharepoint and Onedrive'
                    }
                ]
            },
            {
                name: 'Endpoint Protection',
                list: [
                    {
                        name: 'Managed Endpoint Detection & Response'
                    },
                    {
                        name: '24/7 SOC'
                    },
                    {
                        name: 'Human-Led Investigation'
                    },
                    {
                        name: 'Threat Containment and Elimination'
                    },
                    {
                        name: 'Guided Cleanup and Recovery'
                    },
                    {
                        name: 'Ransomware Canaries'
                    },
                    {
                        name: 'Managed Microsoft Defender'
                    }
                ]
            },
            {
                name: 'Cloud Security',
                list: [
                    {
                        name: 'Security Awareness Training'
                    },
                    {
                        name: '24/7 Identity monitoring and response'
                    },
                    {
                        name: 'Block Unwanted Access'
                    },
                    {
                        name: 'Uncover Shadow Workflows'
                    },
                    {
                        name: 'Location based anomaly detection'
                    },
                    {
                        name: 'Detect threats such as, Session Hijacking, Privilege Escalation, Credential Theft and Malicious Inbox forwarding rules'
                    }
                ]
            }
        ],
        sellingPrice: 42,
        costPrice: 16.95,
        cost: [
            {
                name: 'Ninja One',
                cost: 3.61,
                price: 9,
                requiredMin: 20
            },
            {
                name: 'Huntress MDR',
                cost: 4.82,
                price: 12,
                requiredMin: 20
            },
            {
                name: 'Huntress ITDR',
                cost: 2.76,
                price: 7,
                requiredMin: 20
            },
            {
                name: 'Avepoint M365 backup',
                cost: 5.76,
                price: 14,
                requiredMin: 20
            }

        ],
        vendors: [
            {
                name: 'Ninja One'
            },
            {
                name: 'Huntress MDR / ITDR'
            },
            {
                name: 'Avepoint M365'
            }
        ]
    }
]

