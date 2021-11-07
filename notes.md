### Notes on potential improvements, given more time

- Security:
  - Viewing this application should be hidden behind some sort of login
    information if it is going to be accessible through a publicly available
    URL.
  - CSV data should also be hidden, otherwise it can be freely downloaded by
    hitting the app_url/csv_file_name.csv
- Code Quality:
  - Tests, currently nothing is tested
  - Generalization of data input sources, currently they're somewhat hardcoded,
    instead could look at files in a given spot to determine what should be
    parsed
  - CSS could be cleaned up using SASS, should dig for ways to influence Material
    UI components without using `!important`
- Accessibility Improvements:
  - Chart text needs to be more legible
  - Consider improvements around dynamic sizing of the page, and the impact that
    has on data display
- User Experience Improvements:
  - Dynamically determine the levels used for the charts displayed, rather than
    hardcoding them
  - Find meaningful way to display gender pay disparity
  - Clear out the empty columns that show up when there aren't an even number of
    salaries to display for each level
  - Add line to chart indicating average compensation for each level, to further
    illumnate where discrepancies lie
  - Allow users to select for just salary and just bonus details, rather than
    total compensation
