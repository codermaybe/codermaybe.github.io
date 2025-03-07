// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">关于此站</li><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> 免责声明</a></li><li class="chapter-item expanded affix "><li class="part-title">个人资料(profile)</li><li class="chapter-item expanded "><a href="Personal/简历.html"><strong aria-hidden="true">2.</strong> 中文简历</a></li><li class="chapter-item expanded "><a href="Personal/resume.html"><strong aria-hidden="true">3.</strong> Self Introduntion</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">区块链开发(BlockChain Develop)</li><li class="chapter-item expanded "><a href="BlockChain/General/blockchain.html"><strong aria-hidden="true">4.</strong> BlockChain</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/General/BasicOfBlockchain.html"><strong aria-hidden="true">4.1.</strong> 基础常识</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/General/Mainstream_direction.html"><strong aria-hidden="true">4.1.1.</strong> 主流方向</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> 共识机制</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/General/Consensus/pow.html"><strong aria-hidden="true">4.2.1.</strong> POW</a></li><li class="chapter-item expanded "><a href="BlockChain/General/Consensus/pos.html"><strong aria-hidden="true">4.2.2.</strong> POS</a></li><li class="chapter-item expanded "><a href="BlockChain/General/Consensus/poh.html"><strong aria-hidden="true">4.2.3.</strong> POH</a></li><li class="chapter-item expanded "><a href="BlockChain/General/Consensus/pbft.html"><strong aria-hidden="true">4.2.4.</strong> PBFT</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.5.</strong> BFT</div></li><li class="chapter-item expanded "><a href="BlockChain/General/Consensus/hotstuff.html"><strong aria-hidden="true">4.2.6.</strong> HOTSTUFF</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.3.</strong> 技术概览</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.4.</strong> 商机&amp;&amp;危机</div></li></ol></li><li class="chapter-item expanded "><a href="BlockChain/Ethereum/ethereum.html"><strong aria-hidden="true">5.</strong> Ethereum</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/Ethereum/Basic/EthereumBasic.html"><strong aria-hidden="true">5.1.</strong> 以太坊基础</a></li><li class="chapter-item expanded "><a href="BlockChain/Ethereum/ERC/ERC.html"><strong aria-hidden="true">5.2.</strong> ERC标准</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/Ethereum/ERC/ERC20.html"><strong aria-hidden="true">5.2.1.</strong> ERC20</a></li><li class="chapter-item expanded "><a href="BlockChain/Ethereum/ERC/ERC721.html"><strong aria-hidden="true">5.2.2.</strong> ERC721</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.2.3.</strong> EIP1155</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.3.</strong> 以太坊进阶</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/Ethereum/Advanced/PrivatekeyCovert.html"><strong aria-hidden="true">5.3.1.</strong> 私钥还原</a></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.</strong> Solana</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.</strong> Solidity</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">8.</strong> Ethers</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">8.1.</strong> 以太坊简单合约交互</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.</strong> Hardhat</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">9.1.</strong> Hardhat-ignition</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="BlockChain/Hardhat/Hardhat-Ignition/redeploy/ignition-redeploy.html"><strong aria-hidden="true">9.1.1.</strong> Hardhat-ignition再次部署问题</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="BlockChain/Foundry/FoundryGuide.html"><strong aria-hidden="true">10.</strong> Foundry</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">10.1.</strong> 基础学习</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.</strong> Solana</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">12.</strong> Rollup</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.</strong> ZK</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">Rust</li><li class="chapter-item expanded "><div><strong aria-hidden="true">14.</strong> 基础</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="Rust/Basic/Trait.html"><strong aria-hidden="true">14.1.</strong> 特征</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">计算机组成原理()</li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">网络(Network)</li><li class="chapter-item expanded "><div><strong aria-hidden="true">15.</strong> OSI</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">前端开发(FrontEnd Dev)</li><li class="chapter-item expanded "><div><strong aria-hidden="true">16.</strong> React</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">17.</strong> TypeScript</div></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
