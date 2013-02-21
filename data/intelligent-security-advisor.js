(function(intelligentSecurityAdvisor, showPwd, undefined) {
    
    intelligentSecurityAdvisor.init = function() {
        showPwd.fixPage(3000);
        addDOMListener();
    };

    function addDOMListener() {
        var MutationObserver = window.MutationObserver;
        let observer = new MutationObserver(function(mutations) {
            console.log('mutation observed');
                showPwd.fixPage(3000);
        });
        let container = document.getElementById('passwordFieldContainer');
        observer.observe(document.body, {attributes:true, childList:true, subtree:true, characterData:true, characterData:true});
    }

}(window.intelligentSecurityAdvisor = window.intelligentSecurityAdvisor || {}, showPwd));

