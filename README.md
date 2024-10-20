# TBA PROJ


```
mobile text body : 4rem  
pc body text: 1.2rem  (text-[2rem] xl:text-[1.2rem])
```

# Media screen
```
 xl:(min-width: 1280px)
 lg:(min-width: 1024px)
 md:(min-width: 768px)
 sm:(min-width: 640px)
 xs:(min-width: 475px)
 else
```

# Step build for code
```
1. yarn yarn clean-rm-dist 
2. clean [app.css/bg-image.css/static.js] trong workpress-template/ns-tba-theme/app
3. yarn build
4. yarn copy-css-js-to-khoi 
5. upload to host
```

# Run dev
```
yarn dev  => with localhost
yarn dev -- --host 0.0.0.0  => with your IP address  
```