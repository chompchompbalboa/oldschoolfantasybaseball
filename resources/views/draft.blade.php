@extends('layout')

@section('react-script')
  <script>
    const initialDraftData = {
      players: @json($players)
    }
  </script>
  <script src="{{ mix('js/draft.js') }}"></script>
@endsection