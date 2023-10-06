// type StartData = Readonly<{
//   duration: string;
//   value: number;
//   color: string;
// }>;
//
// enum DurationNights {
//   ONE = '1 night',
//   TWO = '2 nights',
//   THREE = '3 nights',
//   FOUR_FIVE = '4-5 nights',
//   SIX_SEVEN = '6-7 nights',
//   EIGHT_FOURTEEN = '8-14 nights',
//   FIFTEEN_TWENTY_ONE = '15-21 nights',
//   TWENTY_ONE_PLUS = '21+ nights',
// }
//
// const ChartBox = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//
//   padding: 2.4rem 3.2rem;
//   grid-column: 3 / span 2;
//
//   & > *:first-child {
//     margin-bottom: 1.6rem;
//   }
//
//   & .recharts-pie-label-text {
//     font-weight: 600;
//   }
// `;
//
// const startDataLight: StartData = [
//   {
//     duration: DurationNights.ONE,
//     value: 0,
//     color: '#ef4444',
//   },
//   {
//     duration: DurationNights.TWO,
//     value: 0,
//     color: '#f97316',
//   },
//   {
//     duration: DurationNights.THREE,
//     value: 0,
//     color: '#eab308',
//   },
//   {
//     duration: DurationNights.FOUR_FIVE,
//     value: 0,
//     color: '#84cc16',
//   },
//   {
//     duration: DurationNights.SIX_SEVEN,
//     value: 0,
//     color: '#22c55e',
//   },
//   {
//     duration: DurationNights.EIGHT_FOURTEEN,
//     value: 0,
//     color: '#14b8a6',
//   },
//   {
//     duration: DurationNights.FIFTEEN_TWENTY_ONE,
//     value: 0,
//     color: '#3b82f6',
//   },
//   {
//     duration: DurationNights.TWENTY_ONE_PLUS,
//     value: 0,
//     color: '#a855f7',
//   },
// ];
//
// const startDataDark: StartData = [
//   {
//     duration: DurationNights.ONE,
//     value: 0,
//     color: '#b91c1c',
//   },
//   {
//     duration: DurationNights.TWO,
//     value: 0,
//     color: '#c2410c',
//   },
//   {
//     duration: DurationNights.THREE,
//     value: 0,
//     color: '#a16207',
//   },
//   {
//     duration: DurationNights.FOUR_FIVE,
//     value: 0,
//     color: '#4d7c0f',
//   },
//   {
//     duration: DurationNights.SIX_SEVEN,
//     value: 0,
//     color: '#15803d',
//   },
//   {
//     duration: DurationNights.EIGHT_FOURTEEN,
//     value: 0,
//     color: '#0f766e',
//   },
//   {
//     duration: DurationNights.FIFTEEN_TWENTY_ONE,
//     value: 0,
//     color: '#1d4ed8',
//   },
//   {
//     duration: DurationNights.TWENTY_ONE_PLUS,
//     value: 0,
//     color: '#7e22ce',
//   },
// ];
//
// // TODO - check stays type
// function prepareData(startData: StartData[], stays: [{ numNights: number }]) {
//   // A bit ugly code, but sometimes this is what it takes when working with real data 😅
//
//   function incArrayValue(arr: StartData[], field: DurationNights) {
//     return arr.map((obj) =>
//       obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
//     );
//   }
//
//   const data = stays
//     .reduce((arr, cur) => {
//       const num = cur.numNights;
//       if (num === 1) return incArrayValue(arr, DurationNights.ONE);
//       if (num === 2) return incArrayValue(arr, DurationNights.TWO);
//       if (num === 3) return incArrayValue(arr, DurationNights.THREE);
//       if ([4, 5].includes(num))
//         return incArrayValue(arr, DurationNights.FOUR_FIVE);
//       if ([6, 7].includes(num))
//         return incArrayValue(arr, DurationNights.SIX_SEVEN);
//       if (num >= 8 && num <= 14)
//         return incArrayValue(arr, DurationNights.EIGHT_FOURTEEN);
//       if (num >= 15 && num <= 21)
//         return incArrayValue(arr, DurationNights.FIFTEEN_TWENTY_ONE);
//       if (num >= 21) return incArrayValue(arr, DurationNights.TWENTY_ONE_PLUS);
//       return arr;
//     }, startData)
//     .filter((obj) => obj.value > 0);
//
//   return data;
// }
//
