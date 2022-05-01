# Assignment

Please see list of tasks and for each create separate commit with adequate commit message.

## Preparing environment
First of all, DO NOT FORK this repository, otherwise others can easily find your fork with your
solutions. Rather follow up these instructions
1. Create new empty PRIVATE repository (github, gitlab...)
2. Clone this new repository locally and `cd` into it
3. `git pull git@github.com:marusak/verbose-potato.git master` (or use https when you don't have setup keys)

This way you can easily create private copy of this repository. (Github does not allow to prepare private forks)

## Task to complete
1. README.md states that there might be space characters around equal signs in the configuration
   file. However this does not seem to work. Try putting `port =   8000` into `mytime.conf`.
   Fix this issue.
2. Page "Only time" shows only hours and minutes. Add second. Also makes sure the time updates every
   second.
3. Suggest better location for application configuration file than `/var/tmp`. Migrate the
   application to use this new location.

## Submitting your solution
1. From each commit create patch (using `git format-patch`)
2. Create one tarball (`tar.gz`) with all of your patches and submit this archive as instructed
