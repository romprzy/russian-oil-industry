import { pl } from 'vuetify/locale'
export default {
  name: 'nazwa',
  fullName: 'pełna nazwa',
  refinery: 'rafineria',
  RefineryOwners: 'Właściciele rafinerii',
  complex: 'kompleks',
  owner: 'właściciel',
  TotalRefiningCapacity: 'Całkowite możliwości rafinacji',
  OnTheMap: 'Na mapie',
  Selected: 'Wybrane',
  total: 'łącznie',
  Units: 'Jednostki',
  bblPerDay: 'bbl/dzień',
  qMPerDay: 'm³/dzień',
  bblPerYear: 'bbl/rok',
  qMPerYear: 'm³/rok',
  RussianRefineries: 'Rosyjskie Rafinerie',
  // Google maps:
  MapTypes: 'Typy map',
  roadmap: 'mapa drogowa',
  satellite: 'satelita',
  hybrid: 'hybryda',
  terrain: 'teren',
  $vuetify: {
    ...pl,
    dataIterator: {
      rowsPerPageText: 'Rzędy na stronę',
      pageText: '{0}-{1} av {2}',
    },
  },
}
