@extends('layout')

@section('react-script')
  <script>
    const initialData = {
      allPlayerSeasonsBatting: @json($allPlayerSeasonsBatting),
      allPlayerSeasonsPitching: @json($allPlayerSeasonsPitching),
      playerSeasonsByPositionBatting: @json($playerSeasonsByPositionBatting),
      playerSeasonsByPositionPitching: @json($playerSeasonsByPositionPitching)
    }
  </script>
  <script src="{{ mix('js/draft.js') }}"></script>
@endsection