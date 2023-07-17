const headerContainerElem = document.getElementById("header-container");
if (headerContainerElem) {
  headerContainerElem.innerHTML = `
    <div class="flex-container navbar">
      <div>
        <h1>MovieRama</h1>
      </div>
      <div class="flex-container_center">
        <div class="flex-container_center">
          <div id="sort-selector-container"></div>
        </div>
        <div id="search-container"></div>
      </div>
    </div>
  `;
}
