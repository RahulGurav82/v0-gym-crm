export interface Branch {
  id: string
  name: string
  branchCode: string
}

export const BRANCHES: Branch[] = [
  {
    id: "YajpA3SoiaWY3xjx9CAX",
    name: "Ghansoli",
    branchCode: "TFC-GH-01",
  },
  {
    id: "gvDFxqGIHoCBIiANZ0Lm",
    name: "Nerul",
    branchCode: "TFC-NE-01",
  },
  {
    id: "18gIrEyeVVFc7iQwC3EG",
    name: "Ulwe",
    branchCode: "TFC-UL-01",
  },
  {
    id: "jJOQdxbfc1IneoEt4A9F",
    name: "Sanpada",
    branchCode: "TFC-SA-01",
  },
]

export const getBranchById = (id: string): Branch | undefined => {
  return BRANCHES.find((branch) => branch.id === id)
}

export const getBranchByCode = (code: string): Branch | undefined => {
  return BRANCHES.find((branch) => branch.branchCode === code)
}

export const getBranchByName = (name: string): Branch | undefined => {
  return BRANCHES.find((branch) => branch.name.toLowerCase() === name.toLowerCase())
}
