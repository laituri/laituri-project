cd dist
echo 'Set npm opt:'
read npmopt
npm publish --otp=$npmopt
read -n 1 -s -r -p "\n\nPress any key to exit"
cd '../'
rm -rf ./dist