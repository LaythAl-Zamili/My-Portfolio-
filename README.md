# NOTE: Do not fork this repository

# Show date and time

A simple web application to show current date and time

## Running

1. Crate directory `/var/tmp/mytime`
2. Create file `mytime.conf` in this directory with at least port defined. See "Configuration"
   section.
3. Run `python app.py`
4. Visit `localhost:<port>`

## Configuration

Possible configuration in `/var/tmp/mytime/mytime.conf`. Following options are accepted:
- port : Select on which port the application runs
- format : Select format of the displayed time (12h|24h). Default is `24h`
- dynamic : Whether the page should autorefresh (true|false). Default is `true`

Each line has format `key=value`. Multiple space characters are allowed around equal signs.
