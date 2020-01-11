import { useMemo } from 'react';

import { useWindowDimensions } from 'hooks';

function useHooks(props) {
  const { datasetA, datasetB } = props;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const labels = useMemo(() => {
    if (isMobile) return ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }, [isMobile]);

  const datasets = useMemo(() => {
    let dataA = [];
    let dataB = [];
    if (isMobile) {
      dataA = chunkArray(datasetA, 3).map(chunk =>
        chunk.reduce((sum, number) => sum + number, 0),
      );
      dataB = chunkArray(datasetB, 3).map(chunk =>
        chunk.reduce((sum, number) => sum + number, 0),
      );
    } else {
      dataA = datasetA;
      dataB = datasetB;
    }

    return [
      {
        label: 'A',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: dataA,
      },
      {
        label: 'B',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: dataB,
      },
    ];
  }, [datasetA, datasetB, isMobile]);

  return {
    labels,
    datasets,
  };
}

const chunkArray = (arr, size) => {
  const results = [];

  for (let i = 0; i < arr.length; i += size) {
    results.push(arr.slice(i, i + size));
  }

  return results;
};

export { useHooks };
