import type { Checklist } from '@/types'

export const mockChecklists: Checklist[] = [
  {
    id: 'chk-1',
    tripId: 'kyoto-2026',
    title: 'Packing Essentials',
    category: 'packing',
    items: [
      {
        id: 'item-101',
        text: 'Passport & physical flight tickets',
        completed: true,
        assignedTo: 'Elena Rostova',
      },
      {
        id: 'item-102',
        text: 'Type A plug power adapters (Japan standard)',
        completed: true,
        assignedTo: 'Alex Chen',
      },
      {
        id: 'item-103',
        text: 'Slip-on comfortable walking shoes for temples',
        completed: false,
        assignedTo: 'Sarah Miller',
      },
      {
        id: 'item-104',
        text: 'Lightweight layers & autumn rain jacket',
        completed: false,
        assignedTo: 'Elena Rostova',
      },
      {
        id: 'item-105',
        text: 'Pocket coin purse for Japanese Yen coins',
        completed: true,
        assignedTo: 'Alex Chen',
      },
    ],
  },
  {
    id: 'chk-2',
    tripId: 'kyoto-2026',
    title: 'Before You Go',
    category: 'todos',
    items: [
      {
        id: 'item-201',
        text: 'Notify credit card banks of international travel',
        completed: true,
        assignedTo: 'Elena Rostova',
      },
      {
        id: 'item-202',
        text: 'Order Japan eSIM or unlimited pocket Wi-Fi',
        completed: true,
        assignedTo: 'Alex Chen',
      },
      {
        id: 'item-203',
        text: 'Purchase comprehensive international travel insurance',
        completed: false,
        assignedTo: 'Sarah Miller',
      },
      {
        id: 'item-204',
        text: 'Submit Visit Japan Web customs pre-clearance QR',
        completed: false,
        assignedTo: 'Elena Rostova',
      },
    ],
  },
  {
    id: 'chk-3',
    tripId: 'kyoto-2026',
    title: 'Documents & Tech',
    category: 'documents',
    items: [
      {
        id: 'item-301',
        text: 'Offline Google Maps downloaded for Kyoto & Osaka',
        completed: true,
        assignedTo: 'Alex Chen',
      },
      {
        id: 'item-302',
        text: 'Printed ryokan & bullet train booking vouchers',
        completed: false,
        assignedTo: 'Elena Rostova',
      },
      {
        id: 'item-303',
        text: 'Camera spare batteries & external power banks',
        completed: false,
        assignedTo: 'Sarah Miller',
      },
    ],
  },
]
