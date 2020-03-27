<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Old School Fantasy Baseball</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/base.css' )}}">
  </head>
  <body>
    <section id="react-container"></section>
    <script>
    </script>
    @yield('react-script')
  </body>
</html>