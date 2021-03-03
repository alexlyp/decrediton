default: build

compile-go:
	go build -buildmode=c-shared -o ./libdexc/libdexc.so ./libdexc/...

cleanup:
	rm -r build 2> /dev/null || true
	rm -r site 2> /dev/null || true
	rm -r /tmp/dexc 2> /dev/null || true
	mkdir -p site

move-site:
	cp -r ../../../../dcrdex/client/webserver/site/src/ ./site/
	cp -r ../../../../dcrdex/client/webserver/site/dist/ ./site/

build-c:
	./node_modules/.bin/node-gyp configure
	./node_modules/.bin/node-gyp build
	./node_modules/.bin/electron-rebuild

build: compile-go cleanup move-site build-c


run:
	./node_modules/.bin/electron main.js

run-simnet: build
	./node_modules/.bin/electron main.js --simnet