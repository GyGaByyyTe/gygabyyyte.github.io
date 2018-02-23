test'
svgo -f icons/i -o icons/out --config='svgo.config'

svg-sprite-generate -d icons/out -o icons/sprite/mysprite.svg

CRA+Redux tutorial penta-code.com/how-to-add-redux-to-create-react-app/