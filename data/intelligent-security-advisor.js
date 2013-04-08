(function(intelligentSecurityAdvisor, showPwd, undefined) {
    
    const DOM_LISTENER_TARGET = document.body;
    const DOM_LISTENER_OPTIONS = {
                                  childList:true,
                                  subtree:true
                                 };

    intelligentSecurityAdvisor.init = function(data) {
        fieldIcon.init(data);
        showPwd.fixPage(data);
        addDOMListener();
    };

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
            checkNodeList(nodeList);
        });
    }

    function checkNodeList(nodeList) {
        for(let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].type === 'password'){
                showPwd.fixElement(nodeList[i]);
            }
        }
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, showPwd));
