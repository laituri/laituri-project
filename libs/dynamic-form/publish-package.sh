cd dist
echo 'Set npm opt:'
read npmopt
npm publish --otp=$npmopt
cd '../'
rm -rf ./dist