(function(intelligentSecurityAdvisor, showPwd, undefined) {
    
    intelligentSecurityAdvisor.init = function() {
        showPwd.fixPage(3000);
        addDOMListener();
    };

    function addDOMListener() {
        var MutationObserver = window.MutationObserver;
        let observer = new MutationObserver(function(mutations) {
                checkMutations(mutations);
        });
        observer.observe(document.body, {childList:true, subtree:true});
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
                showPwd.fixElement(nodeList[i], 3000);
            }
        }
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, showPwd));
