import React, { useEffect, useRef } from 'react';
import { useNetwork } from '../hooks/useApi';
import * as d3 from 'd3';

const NetworkView = () => {
  const { data, loading, error } = useNetwork();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || loading || !svgRef.current) return;
    
    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.parentElement?.clientWidth || 800;
    const height = svgRef.current.parentElement?.clientHeight || 600;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const color = d3.scaleOrdinal()
      .domain(['pfas', 'energy', 'waste', 'ecosystem', 'cross', 'actor'])
      .range(['#06b6d4', '#22c55e', '#f97316', '#a855f7', '#eab308', '#9ca3af']);

    const simulation = d3.forceSimulation(data.nodes as any)
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", (d: any) => d.source.group === 'cross' || d.target.group === 'cross' ? '#eab308' : '#4b5563')
      .attr("stroke-width", (d: any) => Math.sqrt(d.value));

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", (d: any) => d.radius || 10)
      .attr("fill", (d: any) => color(d.group) as string)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .call(drag(simulation) as any);

    node.append("title")
      .text((d: any) => d.id);

    const labels = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text((d: any) => d.id)
      .attr("font-size", 10)
      .attr("fill", "#e5e7eb")
      .attr("dx", 15)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, [data, loading]);

  if (loading) return <div className="flex h-full items-center justify-center text-cyan-500">Loading Network...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Relation Network</h2>
        <p className="text-sm text-gray-400">Force-directed graph of cross-category relations</p>
      </div>
      <div className="glass-card flex-1 overflow-hidden relative">
        <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing"></svg>
      </div>
    </div>
  );
};

export default NetworkView;
