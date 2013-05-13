(function(intelligentSecurityAdvisor, fixPage, undefined) {

    let payload7;
    const DOM_LISTENER_TARGET = document.body;
    const DOM_LISTENER_OPTIONS = {
        childList: true,
        subtree: true
    };

    intelligentSecurityAdvisor.init = function(data) {
        if (document.readyState === 'complete') {
            initialize(data);
        } else {
            setTimeout(function() {
                initialize(data);
            }, 1500);
        }
    };

    function initialize(data) {
        if (DOM_LISTENER_TARGET != null) {
            let payload3 = {};
            payload3.checkTarget = data.preferences.checkTarget;
            payload7 = payload3;
            //fieldIcon.init(data);
            fixPage.fixPage(data, payload3);
            addDOMListener();
        }
    }

    function addDOMListener() {
        let MutationObserver = window.MutationObserver;
        let observer = new MutationObserver(function(mutations) {
            checkMutations(mutations);
        });
        observer.observe(DOM_LISTENER_TARGET, DOM_LISTENER_OPTIONS);
    }

    function checkMutations(mutations) {
        mutations.forEach(function(mutation) {
            let nodeList = mutation.addedNodes;
            // XXX: nodeList remembers all old mutations as well, with multiple password field fixElement gets called too many times.
            checkNodeList(nodeList);
        });
    }

    function checkNodeList(nodeList) {
        for (let i = 0; i < nodeList.length; i++) {
            checkNode(nodeList[i]);
        }
    }

    function checkNode(node) {
        checkChildNodes(node);
        if (node.type === 'password') {
            fixPage.checkTarget(node, payload7);
        }
    }

    function checkChildNodes(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            checkNode(node.childNodes[i]);
        }
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, fixPage));
