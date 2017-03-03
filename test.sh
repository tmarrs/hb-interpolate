#! /bin/sh
node bin/hb-interpolate-helpers.js -n -j package.json -t testdata/tsd-header.txt > testdata/temp1.txt
node bin/hb-interpolate-helpers.js -n -j testdata/foo.json -t testdata/tsd-header.txt > testdata/temp2.txt
diff testdata/temp1.txt testdata/temp2.txt

node bin/hb-interpolate-helpers.js -n -j package.json -t testdata/nominal.template > testdata/temp3.txt
diff testdata/temp3.txt testdata/nominal.pkg.expected

node bin/hb-interpolate-helpers.js -n -j testdata/foo.json -t testdata/nominal.template > testdata/temp4.txt
diff testdata/temp4.txt testdata/nominal.foo.expected

node bin/hb-interpolate-helpers -n -j testdata/names.json -t testdata/name-help.template -f testdata/testHelpers.js > testdata/temp5.html
diff testdata/temp5.html testdata/names.help.expected.html
